import jwt from "jsonwebtoken";

export function validateJWT (token){
  
    if (!token)
      throw new Error({ type: "Unauthorized", message: "No token provided" });

    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) 
      throw new Error({ type: "Unauthorized", message: "Invalid token" });

    return decoded;
};
