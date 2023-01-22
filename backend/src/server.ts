import express from "express"
import cors from "cors"
import morgan from "morgan"
import * as cron from "node-cron"

import routes from "./routes/routes"
import { databaseConnection } from "./config/db"
import "dotenv/config"

import { clearOldDrones, saveViolatingDrones } from "./controllers/drones"

const app = express()

app.use(cors({ credentials: true, origin: true }))
app.use(morgan("dev"))
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 5001

databaseConnection()

let scheduledJob = cron.schedule("*/1 * * * *", () => {
    console.log("running a task every minute")
    console.log("Clearing drone DB")
    clearOldDrones()
    console.log("storing violating drones")
    saveViolatingDrones()
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
    scheduledJob.start()
})

process.on("SIGINT", () => {
    console.log("Cleaning up...")
    scheduledJob.stop()
    process.exit(0)
})
