import type {Config} from 'drizzle-kit'
import * as dotenv from "dotenv";
dotenv.config({
    path: '.env.local',
  });
  

export default {
    schema: './db/schema.ts',
    out:'./drizzle',
    driver:'pg',
    dbCredentials: {
        connectionString: process.env.DRIZZLE_DATABASE_URL as string,
        database:"todo-db"
      },
      verbose: true,
      strict: true,
} satisfies Config