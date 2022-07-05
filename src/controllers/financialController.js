import { validateJWT } from "../utils/validateJWT.js";
import { createEvent, getUserEvents } from "../repositories/eventsRepository.js";

export async function createEvents (req, res) {
  try {
    let user;
    user = validateJWT(req.headers.authorization);

    const { value, type } = req.body;

    if (!value || !type) {
      return res.sendStatus(422);
    }

    const financialTypes = ["INCOME", "OUTCOME"];
    if (!financialTypes.includes(type)) {
      return res.sendStatus(422);
    }

    if (value < 0) {
      return res.sendStatus(422);
    }

    createEvent(user.id, value, type);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getEvents (req, res) {
  try {
    let user;
    user = validateJWT(req.headers.authorization);

    const events = getUserEvents(user.id);

    res.send(events.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function getSum (req, res) {
  try {
    let user;
    user = validateJWT(req.headers.authorization);

    const events = await getEvents(user.id);

    const sum = events.rows.reduce(
      (total, event) =>
        event.type === "INCOME" ? total + event.value : total - event.value,
      0
    );

    res.send({ sum });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}