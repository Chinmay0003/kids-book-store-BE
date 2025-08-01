import { DataSource } from "typeorm";

export interface Config {
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_USER: string;
  DB_HOST: string;
  REGION: string;
  SECRET_ACCESS_KEY: string;
  ACCESS_KEY_ID: string;
  PORT: string;
  DEFAULT_DATA_SOURCE: DataSource;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
  OPENAI_API_KEY: string;
}
