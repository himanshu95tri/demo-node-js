import express, { Application } from 'express';
import path from "path";
import helmet from 'helmet';
import { urlencoded, json } from "body-parser";
import { db } from './models/index';

const app: Application = express();
const PORT = process.env.PORT || 3000;
const fileUpload = require("express-fileupload")
const cors = require("cors");

app.use(cors({origin: '*', credentials: true })); 
app.use(fileUpload());

// REMINDER: Only for dev Switch STORAGE_PROVIDER in .env to B2 or AWS
//app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json());
//import routes
import auth from './routes/auth.routes';

app.use("/web/v1/", auth);

// Start the server only after database connection
(async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Database connected successfully.');

        // Start the Express server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit if the database connection fails
    }
})();