import { DataSource, DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectTimeoutMS: 15 * 1000,
  maxQueryExecutionTime: 60 * 1000,
  entities: [
    
  ],
  migrations: ["dist/src/svc/migrations/*.{ts,js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: false,
};

const dataSource = new DataSource(config);

export default dataSource;
