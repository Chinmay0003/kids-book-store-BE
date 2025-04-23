import * as process from "node:process";
import dataSource from "~src/config/ormconfig.pgap";
import { Config } from "./types";

export const conf: Config = {
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    REGION: process.env.REGION,
    PORT: process.env.PORT,
    DEFAULT_DATA_SOURCE: dataSource,
};
