import mongoose from 'mongoose';
import { Router } from "express"
import { clearDrones, getDrones, getViolatingDrones, getViolatingDronesWithPilotInfo, saveDrones } from '../controllers/drones';
import PilotModel from "../models/pilot"
import { getRecentViolations } from '../controllers/pilots';

const routes = Router()

routes.get("/", (req, res) => {
    res.json("/-route")
})

routes.get("/pilots", (req, res) => {

    res.json("/-route")
})

routes.get("/recentViolations", async (req, res) => {
    const pilots = await getRecentViolations()
    console.log(pilots);
    
    res.json(pilots)
})

routes.get("/violatingDrones", async (req, res) => {
    const response = await getViolatingDrones()
    //await PilotModel.insertMany(pilots)
    console.log(response);
    res.json(response)
})
routes.get("/getDrones", async (req, res) => {
    const response = await getDrones()
    //await PilotModel.insertMany(pilots)
    console.log(response);
    res.json(response)
})
routes.get("/saveDrones", async (req, res) => {
    const response = await saveDrones()
    //await PilotModel.insertMany(pilots)
    console.log(response);
    res.json(response)
})
routes.get("/clearDrones", async (req, res) => {
    const response = await clearDrones()
    //await PilotModel.insertMany(pilots)
    console.log(response);
    res.json(response)
})
routes.get("/getViolatingDronesWithPilotInfo", async (req, res) => {
    const response = await getViolatingDronesWithPilotInfo()
    //await PilotModel.insertMany(pilots)
    console.log(response);
    res.json(response)
})

export default routes
