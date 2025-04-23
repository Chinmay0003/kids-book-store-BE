import { DataSource, DataSourceOptions } from "typeorm";
import { Book, BookMedia } from "~src/svc/modules/book/entities";

const config: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_POR!),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  connectTimeoutMS: 15 * 1000,
  maxQueryExecutionTime: 60 * 1000,
  entities: [
    Book,
    BookMedia,
  ],
  migrations: ["dist/src/svc/migrations/*.{ts,js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: false,
};

const dataSource = new DataSource(config);

export default dataSource;
