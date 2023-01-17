import axios from "axios"
import PilotModel, { Pilot } from "../models/pilot"

const findPilot = async (serialNumber: string): Promise<Pilot | null> => {
    try {
        const response = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
        const jsonData = response.data
        jsonData.lastSeen = new Date(Date.now()).toISOString()
        const pilot = new PilotModel(jsonData)

        console.log(pilot)

        await pilot.save()
        return pilot
    } catch (err) {
        console.log("Pilot not found", err)
        return null
    }
}

const getRecentViolations = async (): Promise<Pilot[] | null> => {
    try {
        const now = new Date().getTime()
        const tenMinutesAgo = now - 10 * 60 * 1000 // 10 minutes ago in milliseconds

        const pilots = await PilotModel.find({ lastSeen: { $lte: new Date(tenMinutesAgo) } }) //where lastSeen <= 10-mins ago

        if (pilots.length > 0) {
            console.log(pilots[0].lastSeen!)
        }

        return pilots
    } catch (err) {
        console.log("Error getting recent violations: ", err)
        return null
    }
}

export { findPilot, getRecentViolations }
