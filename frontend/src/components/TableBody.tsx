import { Drone, DroneData } from "../interface/Drone"
import "../styles.css"

const TableBody = (droneData: DroneData) => {
    return (
        <tbody>
            {droneData.drone &&
                droneData.drone.map((drone: Drone, index: number) => {
                    return (
                        <tr key={index}>
                            <td>{drone.pilot.pilotId}</td>
                            <td>{drone.pilot.firstName}</td>
                            <td>{drone.pilot.lastName}</td>
                            <td>{drone.pilot.phoneNumber}</td>
                            <td>{drone.pilot.createdDt}</td>
                            <td>{drone.pilot.email}</td>
                            <td>{drone.lastSeen}</td>
                            <td>{drone.closestDistance}</td>
                        </tr>
                    )
                })}
        </tbody>
    )
}

export default TableBody
