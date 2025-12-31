import bcrypt from "bcryptjs";
import { db } from "../models";
import { generateToken } from "../utils/auth/jwtService";

export class AuthService {

  static async register(data: any) {
    console.log(data.name);
    // 1️⃣ Validation
    if (!data?.name) {
      throw new Error("Name is missing!");
    }
    if (!data?.email) {
      throw new Error("Email is missing!");
    }
    if (!data?.password) {
      throw new Error("Password is missing!");
    }
  
    // 2️⃣ Check email already exists
    const existingUser = await db.users.findOne({
      where: { email: data.email }
    });
  
    if (existingUser) {
      throw new Error("Email already registered!");
    }
  
    // 3️⃣ Hash password
    data.password = await bcrypt.hash(data.password, 10);
  
    // 4️⃣ Create user
    const result = db.users.create({
      name: data.name,
      email: data.email,
      password: data.password
    });
    console.log(result);

    return result;
  }

  static async login(data: any) {
    // 1️⃣ Validate input
    if (!data?.email) {
      throw new Error("EMAIL_REQUIRED");
    }

    if (!data?.password) {
      throw new Error("PASSWORD_REQUIRED");
    }

    // 2️⃣ Find user by email
    const user = await db.users.findOne({
      where: { email: data.email }
    });

    if (!user) {
      throw new Error("INVALID_EMAIL");
    }

    // 3️⃣ Compare password
    const isValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isValid) {
      throw new Error("INVALID_PASSWORD");
    }

    // 4️⃣ Generate JWT
    // const token = jwt.sign(
    //   { id: user.id, email: user.email },
    //   process.env.JWT_SECRET as string,
    //   { expiresIn: "1d" }
    // );
    const token = generateToken({ id: user.id, email: user.email });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  }
}
