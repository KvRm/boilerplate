import { Dto, Http } from "types";
import { query } from "../../services/db";
import { logger } from "../../services/logger";
import { ResultSetHeader } from "mysql2";
import { makeSearchSql } from "../../utils/sql";

export async function createOne(params: Http.User.Create.Request) {
  const result = await query<ResultSetHeader>(
    `INSERT INTO users 
    (firstName, lastName, secondName, email, password) 
    VALUES (?, ?, ?, ?, ?)`,
    [
      params.firstName,
      params.lastName,
      params.secondName,
      params.email,
      params.password,
    ]
  );
  return { id: result[0].insertId };
}

export async function updateOne(params: Http.User.Update.Request) {
  await query<ResultSetHeader>(
    `UPDATE users
    SET firstName = ?, lastName = ?, secondName = ?, email = ?
    WHERE id = ?`,
    [
      params.firstName,
      params.lastName,
      params.secondName,
      params.email,
      params.id,
    ]
  );
  return { id: params.id };
}

export async function removeOne(params: Http.User.Remove.Request) {
  await query<ResultSetHeader>(
    `DELETE FROM users
    WHERE id = ?`,
    [params.id]
  );
  return { id: params.id };
}

export async function getOne(params: Http.User.GetEntity.Request) {
  const result = await query(
    `SELECT 
      id,
      firstName,
      lastName,
      secondName,
      email,
      createdAt,
      updatedAt
    FROM users
    WHERE id = ?`,
    [params.id]
  );
  return result[0][0] as Omit<Dto.UserDto, "password">;
}

export async function getMany(params: Http.User.GetList.Request) {
  const { filters, limit, offset, order } = params;

  const { searchSql, searchParams } = makeSearchSql({
    text: `WHERE 
      (firstName LIKE ? OR
      lastName LIKE ? OR
      secondName LIKE ? OR
      email LIKE ?)`,
    searchQueryUsingCount: 4,
    searchQuery: filters?.searchQuery,
  });

  const idsSql = filters?.ids
    ? `${searchSql ? "AND" : "WHERE"} 
      (id in (${params.filters?.ids?.join(",")}))`
    : "";

  const orderSql = order ? `ORDER BY ${order.field} ${order.direction}` : "";

  const listPromise = query(
    `SELECT 
      id,
      firstName,
      lastName,
      secondName,
      email,
      createdAt,
      updatedAt
    FROM users
    ${searchSql}
    ${idsSql}
    ${orderSql}
    LIMIT ${limit} OFFSET ${offset}`,
    [...searchParams]
  );

  const totalPromise = query(
    `SELECT count(1) FROM users ${searchSql} ${idsSql} ${orderSql}`,
    [...searchParams]
  );

  const [list, total] = await Promise.all([listPromise, totalPromise]);
  return {
    list: list[0],
    total: total[0][0]["count(1)"],
  } as { list: Omit<Dto.UserDto, "password">[]; total: number };
}
