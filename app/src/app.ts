import * as express from "express"

// create and setup express app
const app = express()
app.use(express.json()) // parse req.body as JSON

app.get("", async () => {
    console.log('GET\n')
    return { message: "a msg" }
})

const PORT = process.env.NODE_DOCKER_PORT || 8080;
// start express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
