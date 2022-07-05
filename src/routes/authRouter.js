import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.sendStatus(422);
    }

    const existingUsers = await connection.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email]
    );

    if (existingUsers.rowCount > 0) {
      return res.sendStatus(409);
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    await connection.query(
      `INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
      [name, email, hashedPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

authRouter.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(422);
    }

    const { rows } = await connection.query(
      `SELECT * FROM "users" WHERE "email"=$1`,
      [email]
    );
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
});

export default authRouter;