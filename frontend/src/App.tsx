import { useState, useEffect } from "react"
import { Drone } from "./interface/Drone"
import TableBody from "./components/TableBody"
import Buttons from "./components/Buttons"
import LoadingScreen from "./components/LoadingScreen"
import ErrorScreen from "./components/ErrorScreen"

function App() {
    const [drones, setDrones] = useState<Drone[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getViolations = async () => {
        setLoading(true);
        setError(null);
        const res = await fetch("http://localhost:5001/violatingDrones")
        if (!res.ok) {
            console.log(res.status);
            throw new Error(res.statusText);
        }
        const data = await res.json();
        setDrones(data);
        try {
        } catch (err: any) {
            setError(err.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        getViolations();
        const timeoutId = setTimeout(() => {
            getViolations();
        }, 5000);
        return () => clearTimeout(timeoutId);
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }
    if (error) {
        return <ErrorScreen message={error} />;
    }

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
