import mongoose from "mongoose"
import { Router } from "express"
import { clearOldDrones, getViolatingDrones } from "../controllers/drones"

const routes = Router()

routes.get("/violatingDrones", getViolatingDrones)
routes.get("/clearDrones", clearOldDrones)

export default routes
