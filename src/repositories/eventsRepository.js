import connection from "../database/database.js";

export function createEvent(userId, value, type){
  return connection.query(
    `INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
    [userId, value, type]
  );
}

export function getUserEvents(userId) {
  return connection.query(
    `SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
    [userId]
  );
}