import { DataSource } from "typeorm"
import { Order } from "./entity/Order"
import { Location } from "./entity/Location"
import { Timeslot } from "./entity/Timeslot"
import { OrderContact } from "./entity/OrderContact"
require("dotenv").config();

export const dataSource = new DataSource({
    type: "mysql",
    host: "mysql",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    entities: [ Location, Order, OrderContact, Timeslot ],
    logging: true,
    synchronize: true,
})
