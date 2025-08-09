import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import flash from "express-flash";
import path from "path";
import passport from "passport";
import { sql } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import geminiRoutes from "./routes/geminiRoutes.js";
import initializePassport from "./config/passport.js";
import formRoutes from "./routes/formRoutes.js";

initializePassport(passport);

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
    app.use(
        cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
        })
    )
} else {
    app.use(cors());
}

app.use(helmet());
app.use(morgan("dev"));
app.use(flash());

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days in milliseconds
                secure: true, // Required for HTTPS
                sameSite: "Lax", // Required for cross-origin
                httpOnly: true, // Optional, for security
            },
        })
    );
} else {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 4 * 24 * 60 * 60 * 1000, // 4 days in milliseconds
            },
        })
    );
}

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/form", formRoutes);

async function initializeDatabase() {
    try {
        const result = await sql`select version()`;
        console.log("Database version:", result);
        console.log("Connected to the database.");
    } catch (e) {
        console.error("Error connecting to the database: " + e);
    }
}


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get(/(.*)/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
})



