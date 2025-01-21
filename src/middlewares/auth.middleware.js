import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Authentication middleware
export const auth = (req, res, next) => {
    try {
        // Extract JWT token
      
        const token = req.body.token || req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
        
        console.log("printing token at backend auth middleware: ", token);
        if (!token || token === undefined) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // Verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload; // Store the payload in the request object
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token.",
        });
    }
};

// Middleware to check if the user is a vendor
export const isVendor = (req, res, next) => {
    try {
        if (req.user.role !== "Vendor") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for vendor.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching.",
        });
    }
};
// Middleware to check if the user is a customer
export const isCustomer = (req, res, next) => {
    try {
        if (req.user.role !== "Customer") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for customer.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching.",
        });
    }
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admin.",
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching.",
        });
    }
};
