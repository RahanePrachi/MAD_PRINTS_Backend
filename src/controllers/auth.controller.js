import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User} from"../models/user.model.js"
dotenv.config();

// Sign up route handler
export const signup = async (req, res) => {
    try {
        // Get data
        const {  firstName,
            lastName, email, password, role } = req.body;

         //validate data
    if (
        !firstName ||
        !lastName ||
        !email ||
        !password
        
      ) {
        return res.status(403).json({
          success: false,
          message: "all fields are required.",
        });
      }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }

        // Create entry for user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try later",
        });
    }
};

// Login route handler
export const login = async (req, res) => {
    try {
        // Fetch data
        const { email, password } = req.body;

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully.",
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not registered.",
            });
        }

        // Verify password and generate a JWT token
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };

        if (await bcrypt.compare(password, user.password)) {
            // Create JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            user = user.toObject();
            user.token = token;
            user.passward = undefined; // Remove password from user object

            // Create a cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days valid
                httpOnly: true,
            };

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully.",
            });
        } else {
            // Password does not match
            return res.status(403).json({
                success: false,
                message: "Password incorrect",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login failure",
        });
    }
};
