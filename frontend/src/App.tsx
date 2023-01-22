import { useState, useEffect } from "react"
import { Drone } from "./interface/Drone"
import TableBody from "./components/TableBody"
import Buttons from "./components/Buttons"

function App() {
    const [drones, setDrones] = useState<Drone[]>([])

    const getViolations = async () => {
        try {
            const res = await fetch("http://localhost:5001/violatingDrones")
            const data = await res.json()
            console.log(data)
            console.log(res)
            setDrones(data)
        } catch (err) {
            console.log("some error" + err)
        }
    }

    useEffect(() => {
        getViolations()
        const interval = setInterval(() => {
            console.log("auto update")
            console.log(drones)
            getViolations()
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Pilot ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>createdDt</th>
                        <th>Email</th>
                        <th>Last Seen</th>
                        <th>Closest Distance</th>
                    </tr>
                </thead>
                <TableBody drone={drones} />
            </table>
            <Buttons />
        </>
    )
}

export default App
