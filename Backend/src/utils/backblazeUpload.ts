const imageThumbnail = require("image-thumbnail");
import sharp from "sharp";

const env = process.env.NODE_ENV || "development";
const config = require("../config/default.json")[env];

const { applicationKeyId, applicationKey, bucketId } = config.backblaze;
const AWS = require("aws-sdk");

const B2 = require("backblaze-b2");
const b2 = new B2({
  applicationKeyId, // or accountId
  applicationKey // or masterApplicationKey
});

import axios from "axios";
import ffmpeg from "fluent-ffmpeg";
import { tmpdir } from "os";
import { join } from "path";
import fs from "fs";

// ✅ Add these lines once during app boot
ffmpeg.setFfmpegPath(
  "C:\\ffmpeg-7.1.1-essentials_build\\ffmpeg-7.1.1-essentials_build\\bin\\ffmpeg.exe"
);
ffmpeg.setFfprobePath(
  "C:\\ffmpeg-7.1.1-essentials_build\\ffmpeg-7.1.1-essentials_build\\bin\\ffprobe.exe"
);

// keyID:
// 0052175ee71cd080000000001
// keyName:
// triCreatorSecretKey
// applicationKey:
// K005UOud0X/PumrVMjdoGMriA8n6h1k
AWS.config = {
  accessKeyId: "2175ee71cd08",
  accessKeyID: "2175ee71cd08",
  secretAccessKey: "0acbd378367e32cf0fa56ec70b03b767a55c6cb0",
  endpoint: "https://s3.us-east-005.backblazeb2.com",
  region: "us-east-005",
  signatureVersion: "v4"
};

// --------------------
// Main Upload Function
// --------------------
type AllowedFileType = "image" | "video";

export const uploadToStorage = async (
  file: any,
  fileType: AllowedFileType,
  pathPrefix = ""
) => {
  return new Promise(async (resolve) => {
    try {
      let fileName = file.name;
      const allowedTypes: Record<
        AllowedFileType,
        { max: number; ext: RegExp }
      > = {
        image: {
          max: 10 * 1024 * 1024,
          ext: /\.(jpe?g|png|webp|bmp|gif|heic|jfif)$/i
        },
        video: { max: 500 * 1024 * 1024, ext: /\.(mp4|mov|avi|webm|flv)$/i }
      };

      const rules = allowedTypes[fileType];
      if (!rules || !rules.ext.exec(fileName))
        return resolve("invalidFileType");
      if (file.size > rules.max) return resolve("fileSizeTooHigh");

      fileName = `${pathPrefix}${Date.now()}${generateRandom(
        4
      )}-${sanitizeFileName(fileName)}`;

      await b2.authorize();
      const { data } = await b2.getUploadUrl({ bucketId });
      const uploadData = {
        uploadUrl: data.uploadUrl,
        uploadAuthToken: data.authorizationToken,
        fileName,
        data: file.data
      };

      const result = await uploadWithRetry(uploadData);
      resolve(result?.data || result);
    } catch (err) {
      console.error("uploadToStorage Error:", err);
      resolve({ success: false, error: "Upload failed" });
    }
  });
};

// ---------------------------
// Retry wrapper for upload
// ---------------------------
const uploadWithRetry = async (data: any): Promise<any> => {
  for (let i = 0; i < 5; i++) {
    try {
      const response = await b2.uploadFile(data);
      if (response?.data?.fileName) return response;
      return response;
    } catch (err: any) {
      const status = err?.response?.status;
      console.warn(`Retry ${i + 1}: Upload failed`, status);
      if (![500, 503].includes(status)) return err;
    }
  }
  return "uploadWithRetry: retries exhausted";
};

// -------------------------
// Generate Thumbnail
// -------------------------
// export const uploadThumbnail = async (url: string, fileName: string, pathPrefix = '') => {
//   try {
//     const thumbnail = await imageThumbnail({ uri: url });
//     const baseName = fileName.replace(/\.[^/.]+$/, "");
//     const finalName = `${pathPrefix}${baseName}-thumbnail.jpg`;

//     await b2.authorize();
//     const { data } = await b2.getUploadUrl({ bucketId });

//     const uploadData = {
//       uploadUrl: data.uploadUrl,
//       uploadAuthToken: data.authorizationToken,
//       fileName: finalName,
//       data: thumbnail,
//     };

//     const result = await uploadWithRetry(uploadData);
//     return result?.data || result;
//   } catch (error) {
//     console.error("uploadThumbnail error:", error);
//     return null;
//   }
// };

/**
 * Remove trailing slash from a path string
 */
const removeTrailingSlash = (path: string): string =>
  path.endsWith("/") ? path.slice(0, -1) : path;

/**
 * Extracts a thumbnail image from a video buffer using FFmpeg
 */
export const extractVideoThumbnail = (videoBuffer: Buffer): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const inputPath = join(tmpdir(), `${timestamp}-input.mp4`);
    const outputPath = join(tmpdir(), `${timestamp}-thumb.jpg`);

    try {
      fs.writeFileSync(inputPath, videoBuffer);

      ffmpeg(inputPath)
        .inputOptions(["-ss", "00:00:01"]) // seek to 1 second
        .outputOptions(["-frames:v", "1"]) // only 1 frame
        .output(outputPath)
        .size("320x240")
        .on("end", () => {
          try {
            const thumb = fs.readFileSync(outputPath);
            fs.unlinkSync(inputPath);
            fs.unlinkSync(outputPath);
            resolve(thumb);
          } catch (readErr: any) {
            reject(new Error("Thumbnail read error: " + readErr.message));
          }
        })
        .on("error", (err: any, stdout: any, stderr: any) => {
          fs.existsSync(inputPath) && fs.unlinkSync(inputPath);
          fs.existsSync(outputPath) && fs.unlinkSync(outputPath);
          console.error("FFmpeg error details:", stderr);
          reject(new Error(`FFmpeg error: ${err.message}`));
        })
        .run();
    } catch (writeErr: any) {
      reject(new Error("File write failed: " + writeErr.message));
    }
  });
};

/**
 * Uploads a thumbnail for a given image or video file
 */
export const uploadThumbnail = async (
  url: string,
  fileName: string,
  pathPrefix = "",
  fileType: string = "image"
) => {
  try {
    console.log(
      "Creating thumbnail for",
      url,
      "as",
      fileName,
      "with pathPrefix",
      pathPrefix
    );

    let thumbnail: Buffer;

    if (fileType === "video") {
      try {
        const response = await axios.get(url, {
          responseType: "arraybuffer",
          validateStatus: (status) => status >= 200 && status < 300
        });

        if (!response.data || !response.data.byteLength) {
          // throw new Error("Downloaded video buffer is empty.");
        }

        const videoBuffer = Buffer.from(response.data);
        thumbnail = await extractVideoThumbnail(videoBuffer);
      } catch (err: any) {
        console.error("Video thumbnail generation failed:", err.message);
        throw new Error("Unable to generate video thumbnail");
      }
    } else {
      try {
        thumbnail = await imageThumbnail({ uri: url });
      } catch (err: any) {
        console.error("Image thumbnail generation failed:", err.message);
        throw new Error("Unable to generate image thumbnail");
      }
    }

    const finalName = `${removeTrailingSlash(
      pathPrefix
    )}/${fileName}-thumbnail.jpg`;

    await b2.authorize();
    const { data } = await b2.getUploadUrl({ bucketId });

    const result = await uploadWithRetry({
      uploadUrl: data.uploadUrl,
      uploadAuthToken: data.authorizationToken,
      fileName: finalName,
      data: thumbnail
    });

    return result?.data || result;
  } catch (error) {
    console.error("uploadThumbnail error:", error);
    return null;
  }
};

// ------------------------------
// Resize for Social Thumbnail
// ------------------------------
export const resizeImageForSocial = async (buffer: Buffer): Promise<Buffer> => {
  try {
    return await sharp(buffer)
      .resize(1200, 630)
      .jpeg({ quality: 80 })
      .toBuffer();
  } catch (error) {
    console.error("resizeImageForSocial error:", error);
    throw new Error("Image processing failed");
  }
};

// -------------------
// Delete File from Backblaze
// -------------------
export const deleteFileFromBackblaze = async (fileName: string) => {
  try {
    if (!fileName) {
      throw new Error("Missing fileName");
    }

    await b2.authorize();

    // Step 1: Check if file exists in the bucket
    const listResult = await b2.listFileNames({
      bucketId,
      startFileName: fileName,
      maxFileCount: 1,
    });

    const matchedFile = listResult?.data?.files?.[0];

    if (!matchedFile || matchedFile.fileName !== fileName) {
      console.warn(`File not found: ${fileName}`);
      return { success: false, message: "File not found", fileName };
    }

    // Step 2: Delete the matched file version
    const deleted = await b2.deleteFileVersion({
      fileName,
      fileId: matchedFile.fileId,
    });

    console.log(`✅ Deleted from Backblaze: ${fileName}`);
    return { success: true, message: "File deleted", data: deleted.data };
  } catch (error: any) {
    console.error(`❌ deleteFileFromBackblaze error:`, error?.message || error);
    return { success: false, message: error?.message || "Delete failed", fileName };
  }
};

// -------------------
// Helper functions
// -------------------
const sanitizeFileName = (name: string) =>
  name.replace(/[^a-zA-Z0-9_.]+/g, "-").toLowerCase();

export const generateRandom = (length = 6, alphanumeric = true) => {
  const chars = alphanumeric
    ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : "0123456789";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};


