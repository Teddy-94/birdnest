import DroneModel, { Drone } from "../models/drone"
import axios from "axios"
import PilotModel, { Pilot } from "../models/pilot"

const findPilot = async (drone: Drone): Promise<Pilot | null> => {
    try {
        const response = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${drone.serialNumber}`)
        const jsonData = response.data

        jsonData.lastSeen = new Date(Date.now()).toISOString()
        jsonData.lastSeenMs = new Date(Date.now()).getTime()
        jsonData.closestDistance = drone.distance
        const pilot = new PilotModel(jsonData)

        console.log(pilot)

        await pilot.save()
        return pilot
    } catch (err) {
        console.log("Pilot not found")
        return null
    }
}

const getPilots = async (req: any, res: any): Promise<Pilot[] | null> => {
    try {
        const pilots: Pilot[] = await PilotModel.find()
        if (pilots.length > 0) {
            res.status(200).json({ pilots })
            return pilots
        } else {
            console.log("Pilots not found")
            return pilots
        }
    } catch (err) {
        res.status(500)
        return null
    }
}

const getRecentViolations = async (req: any, res: any): Promise<Pilot[] | null> => {
    try {
        let now = new Date().getTime() + 7200000 // 2 hours in milliseconds (Helsinki timezone)
        let tenMinutesAgo = now - 600000 // 10 minutes ago in milliseconds
        const violatingPilots: Pilot[] = []

        const pilots = await PilotModel.find()
        if (pilots.length > 0) {
            pilots.forEach((pilot) => {
                if (pilot.lastSeenMs! >= tenMinutesAgo) {
                    violatingPilots.push(pilot)
                }
            })
            res.status(200).json({ violatingPilots: violatingPilots })
            return violatingPilots
        } else {
            console.log("Pilots not found")
            return null
        }
    } catch (err) {
        res.status(500)
        return null
    }
}

const clearPilotsOverTenMinutes = async () => {
    try {
        let now = new Date().getTime() + 7200000 // +2 hours in milliseconds (Helsinki timezone)
        let tenMinutesAgo = now - 600000 // 10 minutes in milliseconds

        const result = await PilotModel.deleteMany({ lastSeenMs: { $lt: tenMinutesAgo } })
        console.log(result)
        return result
    } catch (err) {
        console.log("Error getting clearing pilots: ", err)
        return null
    }
}

export { findPilot, getRecentViolations, getPilots, clearPilotsOverTenMinutes }
