type DatabaseConfig = {
  uri: string
  name: string
}

type JWTConfig = {
  accessSecret: string
  refreshSecret: string
}

type Config = {
  database: DatabaseConfig
  jwt: JWTConfig
}

export const config: Config = {
  database: {
    uri: process.env.DB_CONNECT_URI ?? '',
    name: process.env.DB_NAME ?? 'example',
  },
  jwt: {
    accessSecret: process.env.ACCESS_SECRET ?? '',
    refreshSecret: process.env.REFRESH_SECRET ?? '',
  },
}
