import bcrypt from "bcrypt";
import { createUser, searchUser } from "../repositories/userRepository.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUsers = await searchUser("email", email);

    if (existingUsers.rowCount > 0) return res.sendStatus(409);
  
    const hashedPassword = bcrypt.hashSync(password, 12);

    createUser(name, email, hashedPassword);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(422);
    }

    const { rows } = await searchUser("email", email);
    const [user] = rows;

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.sendStatus(401);
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET
    );

    res.send({
      token,
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
