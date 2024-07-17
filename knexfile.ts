import { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();
const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CLIENT || "pg",
    connection: {
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "Data123",
      database: process.env.DB_NAME || "knix_poc",
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
