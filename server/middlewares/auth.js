import jwt from "jsonwebtoken";

// Middleware Function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({ success: false, message: "Not Authorized. Login Again." });
    }

    const token = authHeader.split(" ")[1]; // Get token from "Bearer <token>"
    const token_decode = jwt.decode(token);
    console.log("Decoded Token:", token_decode);

    if (!token_decode || !token_decode.clerkId) {
      return res.json({ success: false, message: "Invalid token or clerkId missing." });
    }

    req.clerkId = token_decode.clerkId;
    console.log("Clerk ID:", req.clerkId);

    next();
  } catch (error) {
    console.log("Error in authUser middleware:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
