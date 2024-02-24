import { MongoClient } from 'mongodb'

const DB_URI = process.env.DB_CONNECT_URI ?? ''
const DB_NAME: string = process.env.DB_NAME ?? 'example'

type CreateDBConnection = {
  getConnection: () => Promise<MongoClient>
}

export const createDBconnection = (): CreateDBConnection => {
  let connection: MongoClient
  const firstStart: boolean = true

  if (DB_URI === '') {
    throw new Error('mongo db uri does not valid.')
  }

  const initializeSchema = async (): Promise<void> => {
    try {
      await connection
        .db(DB_NAME)
        .collection('user')
        .createIndex({ username: 1 }, { unique: true })
    } catch (error) {
      // Do we need to do something ?
    }
  }

  const getConnection = async (): Promise<MongoClient> => {
    if (!(connection instanceof MongoClient)) {
      connection = await new MongoClient(DB_URI).connect()
      if (firstStart) {
        await initializeSchema()
      }
    }
    return connection
  }

  return {
    getConnection,
  }
}
