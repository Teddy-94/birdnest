import axios from "axios"
import PilotModel, { Pilot } from "../models/pilot"

const findPilot = async (serialNumber: String): Promise<Pilot | null> => {
    try {
        const response = await axios.get(`http://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
        const jsonData = response.data

        const pilot = new PilotModel(jsonData)

        return pilot
    } catch (err) {
        console.log("Pilot not found")
        console.log(err)
        return null
    }
}

export { findPilot, }
