import axios from 'axios'

const getEnvironmentVariable = (environmentVariable: string): string => {
  const unvalidatedEnvironmentVariable = process.env[environmentVariable]
  if (!unvalidatedEnvironmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    )
  } else {
    return unvalidatedEnvironmentVariable
  }
}

const config = {
  MONGO_DB_API_KEY: getEnvironmentVariable('MONGO_DB_API_KEY'),
}

export const mongoAPI = axios.create({
  baseURL:
    'https://data.mongodb-api.com/app/data-lfvzt/endpoint/data/v1/action/find',
  headers: {
    'Content-Type': 'application/json',
    'api-key': config.MONGO_DB_API_KEY,
  },
})
