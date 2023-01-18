import express from "express"
import cors from "cors"
import morgan from "morgan"
import * as cron from "node-cron"

import routes from "./routes/routes"
import { databaseConnection } from "./config/db"
import "dotenv/config"

import { clearDrones, getViolatingDronesWithPilotInfo, saveDrones } from "./controllers/drones"
import { clearPilotsOverTenMinutes } from "./controllers/pilots"

const app = express()

app.use(cors({ credentials: true, origin: true }))
app.use(morgan("dev"))
app.use(express.json())
app.use(routes)

const port = process.env.PORT || 5001

databaseConnection()

let scheduledJob = cron.schedule("* * * * *", () => {
    console.log("running a task every minute")
    console.log("Clearing drone DB")
    clearDrones()
    console.log("Saving new Drone Snapshot to DB")
    saveDrones()
    console.log("Clearing old Pilot data")
    clearPilotsOverTenMinutes()
    console.log("Storing pilots violating the NDZ")
    getViolatingDronesWithPilotInfo()

});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)

    scheduledJob.start();
});

process.on('SIGINT', () => {
    console.log("Cleaning up...")
    scheduledJob.stop()
    process.exit(0)
});