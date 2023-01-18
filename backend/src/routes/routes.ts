import mongoose from "mongoose"
import { Router } from "express"
import { clearDrones, getDrones, getViolatingDrones, getViolatingDronesWithPilotInfo, saveDrones } from "../controllers/drones"
import PilotModel from "../models/pilot"
import { getRecentViolations, getPilots, clearPilotsOverTenMinutes } from "../controllers/pilots"

const routes = Router()

routes.get("/pilots", getPilots)
routes.get("/recentViolations", getRecentViolations)
routes.get("/violatingDrones", getViolatingDrones)
routes.get("/getDrones", getDrones)
routes.get("/saveDrones", saveDrones)
routes.get("/clearDrones", clearDrones)
routes.get("/getViolatingDronesWithPilotInfo", getViolatingDronesWithPilotInfo)
routes.get("/clearPilotsOverTenMinutes", clearPilotsOverTenMinutes)

export default routes
