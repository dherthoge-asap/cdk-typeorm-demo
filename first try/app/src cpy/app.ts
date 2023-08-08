import * as express from "express"
import { Request, Response } from "express"
const app = express()
// start express server
app.listen(3000, () => {
    console.log(`Server is running on port ${3000}.`)
})
