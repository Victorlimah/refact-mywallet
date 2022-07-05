import connection from '../database/database.js';

export function searchUser(param, value){
  return connection.query(`
    SELECT * FROM "users" WHERE ${param} = '$1'
  `, [value]);
}

export function createUser(name, email, password){
  return connection.query(`
    INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)
  `, [name, email, password]);
}