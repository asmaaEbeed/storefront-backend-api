import bcrypt from 'bcrypt'
import { Connection } from 'pg'
import Client from '../database'
import jwt from 'jsonwebtoken'

const { BCRYPT_PASSWORD: PEPPER, SALT_ROUNDS, TOKEN_SECRET } = process.env

if (!PEPPER || !SALT_ROUNDS || !TOKEN_SECRET) throw new Error()

export type User = {
  id?: string
  firstName: string
  lastName: string
  password: string
  email: string
}

export class makeUserModel {
  async index(): Promise<User[]> {
    const conn = await Client.connect()
    try {
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      return result.rows
    } catch (err) {
      throw new Error(`Unable get users: ${err}`)
    } finally {
      conn.release()
    }
  }
  async showUser(id: string): Promise<User> {
    const connection = await Client.connect()
    try {
      console.log(id)
      const result = await connection.query('SELECT * FROM users WHERE id = $1', [id])
      if (result.rowCount === 0) throw new Error(`user ${id} is not found`)
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`)
    } finally {
      connection.release()
    }
  }
 

  async update(id: string, user: Partial<User>): Promise<User> {
    const connection = await Client.connect()
    try {
      const result = await connection.query<User>(
        'UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id=$4 RETURNING *',
        [user.firstName, user.lastName, user.email, user.id]
      )

      if (result.rowCount === 0) throw `User ${id} not found.`
      return result.rows[0]
    } finally {
      connection.release()
    }
  }

  async remove(id: string): Promise<void> {
    const connection = await Client.connect()
    try {
      const result = connection.query('DELETE FROM users WHERE id = $1', [id])
      return
    } finally {
      connection.release()
    }
  }
}
