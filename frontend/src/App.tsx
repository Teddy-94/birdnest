import { useState, useEffect } from "react"
import { Pilot } from "./interface/Pilot"
import TableBody from "./components/TableBody"
import Buttons from "./components/Buttons"

function App() {
    const [pilots, setPilots] = useState<Pilot[]>([])

    const fetchPilots = async () => {
        try {
            const res = await fetch("http://localhost:5001/pilots")
            const data = await res.json()
            console.log(data)
            console.log(res)
            setPilots(data)
        } catch (err) {
            console.log("some error" + err)
        }
    }

    useEffect(() => {
        fetchPilots()
        const interval = setInterval(() => {
            console.log("auto update")
            console.log(pilots)
            fetchPilots()
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
                <TableBody pilots={pilots} />
            </table>
            <Buttons />
        </>
    )
}

export default App
