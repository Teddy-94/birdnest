import { Drone, DroneData } from "../interface/Drone";
import "../styles.css";

const TableBody = (droneData: DroneData) => {
    return (
        <tbody>
            {droneData.drone &&
                droneData.drone.map((drone: Drone, index: number) => {
                    const id = drone.pilot.pilotId;
                    const firstName = drone.pilot.firstName;
                    const lastName = drone.pilot.lastName;
                    const phoneNumber = drone.pilot.phoneNumber;
                    const createdDt = drone.pilot.createdDt;
                    const email = drone.pilot.email;
                    const lastSeen = new Date(drone.lastSeen!).toLocaleString("se", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                    });
                    const closestDistanceMs = drone.closestDistance;

                    return (
                        <tr key={index}>
                            <td>{id}</td>
                            <td>{firstName}</td>
                            <td>{lastName}</td>
                            <td>{phoneNumber}</td>
                            <td>{createdDt}</td>
                            <td>{email}</td>
                            <td>{lastSeen}</td>
                            <td>{closestDistanceMs}</td>
                        </tr>
                    );
                })}
        </tbody>
    );
};

export default TableBody;
