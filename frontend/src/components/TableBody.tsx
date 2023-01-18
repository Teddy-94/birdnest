import { Pilot } from "../interface/Pilot"
import "../styles.css"

const TableBody = (props: any) => {
    return (
        <tbody>
            {props.pilots.pilots &&
                Array.isArray(props.pilots.pilots) &&
                props.pilots.pilots.map((pilot: Pilot, i: any) => {
                    return (
                        <tr key={i}>
                            <td>{pilot.pilotId}</td>
                            <td>{pilot.firstName}</td>
                            <td>{pilot.lastName}</td>
                            <td>{pilot.phoneNumber}</td>
                            <td>{pilot.createdDt}</td>
                            <td>{pilot.email}</td>
                            <td>{pilot.lastSeen}</td>
                            <td>{pilot.closestDistance}</td>
                        </tr>
                    )
                })}
        </tbody>
    )
}

export default TableBody
