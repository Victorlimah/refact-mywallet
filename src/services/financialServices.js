import { validateJWT } from "../utils/validateJWT.js";
import * as repository from "../repositories/eventsRepository.js";

export function createEvent(token, value, type){
    let  user = validateJWT(token);

    const financialTypes = ["INCOME", "OUTCOME"];
    if (!financialTypes.includes(type)) 
      throw new Error({type: "UnprocessableEntity", message: "Invalid type"});

    if (value < 0) 
      throw new Error({type: "UnprocessableEntity", message: "Invalid value"});
    
    repository.createEvent(user.id, value, type);
}

export async function getUserEvents(token){
    let user = validateJWT(token);
    return await repository.getUserEvents(user.id).rows;
}

export async function getSum(token){
    let user = validateJWT(token);
    const events = await getUserEvents(user.id);

    const sum = events.reduce(
      (total, event) =>
        event.type === "INCOME" ? total + event.value : total - event.value,
      0
    );

    return { sum };
}