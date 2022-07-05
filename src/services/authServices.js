import bcrypt from "bcrypt";
import { createUser } from "../repositories/userRepository.js";

export async function register(name, email, password){
  const existingUsers = await searchUser("email", email);

  if (existingUsers.rowCount > 0) 
    throw new Error({type: "Conflict", message: "User already exists"});
  
  const hashedPassword=  bcrypt.hashSync(password, 12);
  createUser(name, email, hashedPassword);
}

export async function login(email, password){
  const existingUsers = await searchUser("email", email);

  if (existingUsers.rowCount === 0) 
    throw new Error({type: "Unauthorized", message: "User not found"});

  const [user] = existingUsers.rows;
  const { id, password: hashedPassword } = user;

  if (!bcrypt.compareSync(password, hashedPassword)) 
    throw new Error({type: "Unauthorized", message: "Invalid password"});

  const token = jwt.sign({ id }, process.env.JWT_SECRET);
  return { token };
}
