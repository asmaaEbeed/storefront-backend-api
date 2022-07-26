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

export class makeUserModel {
  async index(): Promise<User[]> {
    const conn = await Client.connect()
    try {
        const sql = 'SELECT * FROM users'

        const result = await conn.query(sql)

        return result.rows


    } catch(err){
        throw new Error(`Unable get users: ${err}`)
    }
    finally {
        conn.release()
    }
}
async showUser(id: string): Promise<User> {
  const connection = await Client.connect();
  try {
    console.log(id);
      const result = await connection.query('SELECT * FROM users WHERE id = $1', [id]);
      if(result.rowCount === 0) throw new Error(`user ${id} is not found`);
      return result.rows[0];
  } catch (err) {
    throw new Error(`Could not find user ${id}. Error: ${err}`)
  }
  finally {
      connection.release();
  }
}
  async create(u: User) {
    const conn = await Client.connect()
    try {
      // @ts-ignore
      const sql = `INSERT INTO users (firstName, lastName, password, email) VALUES($1, $2, $3, $4) RETURNING *`

      const hash = bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS))

      const result = await conn.query(sql, [u.firstName, u.lastName, hash, u.email])
      console.log("inserted successfully")
      const user = result.rows[0]

      const token = jwt.sign(user, TOKEN_SECRET!)

      return token
    } catch (err) {
      throw new Error(`unable create user (${u.email}): ${err}`)
    } finally {
      conn.release()
    }
  }

  async authenticate(params: LoginParams) {
    const conn = await Client.connect()
    try {
      const sql = 'SELECT * FROM users WHERE email=($1)'

      const result = await conn.query(sql, [params.email])

      console.log(params.password + PEPPER)

      if (result.rowCount === 0) throw new Error("Wrong user name or password");
        
        const { password: hashed, ...user } = result.rows[0]
        const isValid = await bcrypt.compare(params.password + PEPPER, hashed)

        if (!isValid) throw new Error('Wrong userNameor password')

        const token = jwt.sign(user, TOKEN_SECRET!)
        return token
    }
        // console.log(user)

        // if (bcrypt.compareSync(password + PEPPER, user.password)) {
        //   return user
        // }
      
    catch (err) {
      throw new Error(`Could not login ${params.email}. Error: ${err}`)
    } finally {
      conn.release()
    }
  }

  verify(token: string) {
    return jwt.verify(token, TOKEN_SECRET!)
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const connection = await Client.connect()
    try {
      const result = await connection.query<User>(
        'UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id=$4 RETURNING *',
        [user.firstName, user.lastName, user.email]
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
