import { MongoClient } from 'mongodb'
import { config } from '@/configs'

type CreateDBConnection = {
  getConnection: () => Promise<MongoClient>
}

export const createDBconnection = (): CreateDBConnection => {
  let connection: MongoClient
  const firstStart: boolean = true

  if (config.database.uri === '') {
    throw new Error('mongo db uri does not valid.')
  }

  const createIndexes = async (): Promise<void> => {
    try {
      await connection
        .db(config.database.name)
        .collection('user')
        .createIndex({ username: 1 }, { unique: true })
    } catch (error) {
      // Do we need to do something ?
    }
  }

  const getConnection = async (): Promise<MongoClient> => {
    if (!(connection instanceof MongoClient)) {
      connection = await new MongoClient(config.database.uri).connect()
      if (firstStart) {
        await createIndexes()
      }
    }
    return connection
  }

  return {
    getConnection,
  }
}
