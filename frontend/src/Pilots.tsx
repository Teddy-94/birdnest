import React, { useState, useEffect } from "react"
import "./styles.css"

interface Pilot {
    name: string
    email: string
    phone: string
    distance: string
    serialNumber: number
}

const Pilots: React.FC = () => {
    const [pilots, setPilots] = useState<Pilot[]>([])

    useEffect(() => {
        const fetchPilots = async () => {
            try {
                const res = await fetch("/pilots")
                const data = await res.json()
                setPilots(data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchPilots()
    }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Distance</th>
                    </tr>
                </thead>
                <tbody>
                    {pilots.map((pilot) => (
                        <tr key={pilot.serialNumber}>
                            <td>{pilot.name}</td>
                            <td>{pilot.email}</td>
                            <td>{pilot.phone}</td>
                            <td>{pilot.distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                onClick={async () => {
                    await fetch("http://localhost:5001/recentViolations")
                }}
            >
                recent violations
            </button>
            <button
                onClick={async () => {
                    await fetch("http://localhost:5001/getDrones")
                }}
            >
                get drones
            </button>
            <button
                onClick={async () => {
                    await fetch("http://localhost:5001/saveDrones")
                }}
            >
                save drones
            </button>
            <button
                onClick={async () => {
                    await fetch("http://localhost:5001/clearDrones")
                }}
            >
                clear drones
            </button>
            <button
                onClick={async () => {
                    await fetch("http://localhost:5001/violatingDrones")
                }}
            >
                violating drones
            </button>

            <button
                onClick={async () => {
                    await fetch("http://localhost:5001/getViolatingDronesWithPilotInfo")
                }}
            >
                getViolatingDronesWithPilotInfo
            </button>
        </>
    )
}

export default Pilots
