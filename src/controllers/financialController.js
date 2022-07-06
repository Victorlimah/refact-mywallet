import * as service from "../services/financialServices.js";

export async function createEvents (req, res) {
  const token = req.headers.authorization;  
  const { value, type } = req.body;
  service.createEvent(token, value, type);
  res.sendStatus(201);
}

export async function getEvents (req, res) {
  const token  = req.headers.authorization;
  const events = service.getUserEvents(token);
  res.send(events);
}

export async function getSum (req, res) {
    const token = req.headers.authorization;
    const sum = service.getSum(token);
    res.send(sum);
}
