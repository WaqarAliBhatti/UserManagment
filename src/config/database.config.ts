import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { Auth } from 'src/auth/entities/auth.entity';
import { User } from 'src/user/entities/user.entity';
dotenv.config();

const dbConfig = {
  host: process.env.TYPE_ORM_DATABASE_HOST,
  port: process.env.TYPE_ORM_DATABASE_PORT,
  username: process.env.TYPE_ORM_DATABASE_USERNAME,
  password: process.env.TYPE_ORM_DATABASE_PASSWORD,
  name: process.env.TYPE_ORM_DATABASE_NAME,
};
console.log("Database Connected ==>",dbConfig);


export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: dbConfig.host,
    port: +dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.name,
    entities: [
      User,
      Auth
    ],
    synchronize: true, // NOTE: Set to `false` in production
    }
