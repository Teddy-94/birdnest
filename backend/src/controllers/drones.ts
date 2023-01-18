import DroneModel, { Drone } from "../models/drone"
import PilotModel, { Pilot } from "../models/pilot"
import { findPilot } from "./pilots"
import axios from "axios"
import { DOMParser } from "xmldom"

const getDrones = async (): Promise<Drone[]> => {
    const { data: xmlString } = await axios.get("http://assignments.reaktor.com/birdnest/drones")
    const parser = new DOMParser()
    const xml = parser.parseFromString(xmlString, "application/xml")
    const droneElements = xml.getElementsByTagName("drone")
    const drones: Drone[] = []

    for (let i = 0; i < droneElements.length; i += 1) {
        const drone = droneElements[i]

        const serialNumber = drone.getElementsByTagName("serialNumber")[0].textContent
        const model = drone.getElementsByTagName("model")[0].textContent
        const manufacturer = drone.getElementsByTagName("manufacturer")[0].textContent
        const mac = drone.getElementsByTagName("mac")[0].textContent
        const ipv4 = drone.getElementsByTagName("ipv4")[0].textContent
        const ipv6 = drone.getElementsByTagName("ipv6")[0].textContent
        const firmware = drone.getElementsByTagName("firmware")[0].textContent
        const positionY = Number(drone.getElementsByTagName("positionY")[0].textContent)
        const positionX = Number(drone.getElementsByTagName("positionX")[0].textContent)
        const altitude = Number(drone.getElementsByTagName("altitude")[0].textContent)

        drones.push(
            new DroneModel({
                serialNumber,
                model,
                manufacturer,
                mac,
                ipv4,
                ipv6,
                firmware,
                positionY,
                positionX,
                altitude,
            })
        )
    }
    return drones
}

const checkNoFlyZone = async (drones: Drone[]): Promise<Drone[]> => {
    const noFlyZoneRadius = 100000
    const noFlyZoneX = 250000
    const noFlyZoneY = 250000
    const violatingDrones: Drone[] = []

    for (const drone of drones) {
        const distance = Math.sqrt((noFlyZoneX - drone.positionX!) ** 2 + (noFlyZoneY - drone.positionY!) ** 2)
        drone.distance=distance;
        if (distance < noFlyZoneRadius) {
            violatingDrones.push(drone)
        }
    }
    return violatingDrones
}

const getViolatingDrones = async (): Promise<Drone[]> => {
    const drones = await DroneModel.find()

    const violatingDrones: Drone[] = await checkNoFlyZone(drones)
    console.log("there are " + drones.length + " drones in the snapshot. " + violatingDrones.length + " are in the no fly zone")

    return violatingDrones
}

const saveViolatingDrones = async (violatingDrones: Drone[]): Promise<void> => {
    for (const drone of violatingDrones) {
        const existingDrone = await DroneModel.findOne({ serialNumber: drone.serialNumber })
        if (existingDrone) {
            await existingDrone.updateOne(drone)
            console.log(drone)
        } else {
            console.log(drone)
            await new DroneModel(drone).save()
        }
    }
}

const saveDrones = async (): Promise<void> => {
    const drones: Drone[] = await getDrones()
    for (const drone of drones) {
        await new DroneModel(drone).save()
    }
}

const clearDrones = async (): Promise<void> => {
    await DroneModel.deleteMany()
}

const getViolatingDronesWithPilotInfo = async (): Promise<{ drone: Drone; pilot: Pilot }[]> => {
    const violatingDrones: Drone[] = await getViolatingDrones()
    const dronesWithPilotInfo: { drone: Drone; pilot: Pilot }[] = []
    for (const drone of violatingDrones) {
        const pilot = await findPilot(drone)
        if (pilot) {
            dronesWithPilotInfo.push({ drone, pilot })
        }
    }
    return dronesWithPilotInfo
}

export { getViolatingDronesWithPilotInfo, saveViolatingDrones, getDrones, saveDrones, getViolatingDrones, clearDrones }
