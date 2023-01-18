import axios from "axios"
import PilotModel, { Pilot } from "../models/pilot"

const findPilot = async (serialNumber: string): Promise<Pilot | null> => {
    try {
        const response = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
        const jsonData = response.data
        jsonData.lastSeen = new Date(Date.now()).toISOString()
        jsonData.lastSeenMs = new Date(Date.now()).getTime()
        const pilot = new PilotModel(jsonData)

        console.log(pilot)

        await pilot.save()
        return pilot
    } catch (err) {
        console.log("Pilot not found", err)
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
            throw new Error("No pilots found")
        }
    } catch (err) {
        res.status(500)
        console.log("Pilot not found", err)
        return null
    }
}

const getRecentViolations = async (req: any, res: any): Promise<Pilot[] | null> => {
    try {
        let now = new Date().getTime() + 7200000 // 2 hours in milliseconds (Helsinki timezone)
        let tenMinutesAgo = now - 600000 // 10 minutes ago in milliseconds
        const vilatingPilots: Pilot[] = []

        const pilots = await PilotModel.find()
        if (pilots.length > 0) {
            pilots.forEach((pilot) => {
                if (pilot.lastSeenMs! >= tenMinutesAgo) {
                    vilatingPilots.push(pilot)
                }
            })
            res.status(200).json({ vilatingPilots })
            return vilatingPilots
        } else {
            throw new Error("No pilots found")
        }
    } catch (err) {
        res.status(500)
        console.log("Error getting recent violations: ", err)
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
