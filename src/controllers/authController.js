import * as service from "../services/authServices.js";

export async function register(req, res) {
    const { name, email, password } = req.body;
    service.register(name, email, password);
    res.sendStatus(201);
}

export async function login(req, res) {
    const { email, password } = req.body;
    const token = service.login(email, password);
    res.send(token);
}
