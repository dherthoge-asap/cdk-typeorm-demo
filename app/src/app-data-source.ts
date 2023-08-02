import { DataSource } from "typeorm"
import { Order } from "./entity/Order"
import { Location } from "./entity/Location"
import { Timeslot } from "./entity/Timeslot"
import { OrderContact } from "./entity/OrderContact"
require("dotenv").config();

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 62935,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [ Location, Order, OrderContact, Timeslot ],
    logging: true,
    synchronize: true,
})
