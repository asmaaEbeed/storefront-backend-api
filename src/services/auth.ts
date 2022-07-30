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

type LoginParams = {
  email: string;
  password: string 
}

export class authenticate {
  // async checkExist(params: LoginParams): Promise<Number> {
  //   try{

  //     const conn = await Client.connect()
  //     const sqlEmail = `SELECT * FROM users WHERE email=$1`
  //     const emailResult = await conn.query(sqlEmail,[params.email])
  //     const result = emailResult.rows.length;
  //     return result;
  //   } catch(err) {
  //     throw new Error(`Unable create user (${params.email}): ${err}`)
  //   }
      
  // }
  async create(u: User) {
    const conn = await Client.connect()
    try {

      // @ts-ignore
      const sql = `INSERT INTO users (firstName, lastName, password, email) VALUES($1, $2, $3, $4) RETURNING *`

      const hash = bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS))

      const result = await conn.query(sql, [u.firstName, u.lastName, hash, u.email])
      console.log('inserted successfully')
      const user = result.rows[0]

      const token = jwt.sign(user, TOKEN_SECRET!)

      return { token, id: user.id }
      
    } catch (err) {
      throw new Error(`unable create user (${u.email}): ${err}`)
    } finally {
      conn.release()
    }
  }

  async login(params: LoginParams) {
    const conn = await Client.connect()
    try {
      const sql = 'SELECT * FROM users WHERE email=($1)'

      const result = await conn.query(sql, [params.email])

      console.log(params.password + PEPPER)

      if (result.rowCount === 0) throw new Error('Wrong user name or password')

      const { password: hashed, ...user } = result.rows[0]
      const isValid = await bcrypt.compare(params.password + PEPPER, hashed)

      if (!isValid) throw new Error('Wrong userNameor password')

      const token = jwt.sign(user, TOKEN_SECRET!)
      return {token, id: user.id}
    } catch (err) {
      // console.log(user)

      // if (bcrypt.compareSync(password + PEPPER, user.password)) {
      //   return user
      // }

      throw new Error(`Could not login ${params.email}. Error: ${err}`)
    } finally {
      conn.release()
    }
  }

  verify(token: string) {
    return jwt.verify(token, TOKEN_SECRET!)
  }
}
