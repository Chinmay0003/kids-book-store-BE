import { DataSource, DataSourceOptions } from "typeorm";
import { AppUser } from "~src/svc/modules/auth/entities/user";
import { Book, BookMedia, BookMetadata } from "~src/svc/modules/book/entities";
import { Cart, CartBookTopology } from "~src/svc/modules/cart/entities";
import { Address, Coupon } from "~src/svc/modules/checkout/entities";
import { Business, BusinessBookTopology } from "~src/svc/modules/business";

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
    AppUser,
    Cart,
    CartBookTopology,
    Address,
    Coupon,
    Business,
    BusinessBookTopology,
    BookMetadata,
  ],
  migrations: ["dist/src/svc/migrations/*.{ts,js}"],
  migrationsTableName: "migrations_typeorm",
  migrationsRun: false,
};

const dataSource = new DataSource(config);

export default dataSource;
