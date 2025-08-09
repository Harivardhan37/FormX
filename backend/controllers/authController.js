import bcrypt from "bcrypt";
import { sql } from "../config/db.js";

export const register = async (req, res) => {
  try {
    if (req.body.password.length < 8) {
      console.log("Password must be at least 8 characters long");
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const result =
      await sql`SELECT * FROM users WHERE email = ${req.body.email}`;
    if (result.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const result1 = await sql`
            INSERT INTO users (name, email, password)
            VALUES (${req.body.name}, ${req.body.email}, ${hashedPassword})
            RETURNING *
        `;
    const user = result1[0];
    req.logIn(user, (e)=>{
      console.log("Redirecting..");
      return res
        .status(201)
        .json({ success: true, message: "User registered successfully", user });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error registering user" });
  }
};

export const logOut = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
};
