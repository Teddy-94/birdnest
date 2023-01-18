const Buttons: React.FC = () => {
    return (
        <>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/pilots")

                    const data = await res.json()
                    console.log(data)
                }}
            >
                get violating pilots
            </button>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/recentViolations")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                recent violations
            </button>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/getDrones")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                get drones
            </button>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/saveDrones")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                save drones
            </button>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/clearDrones")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                clear drones
            </button>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/violatingDrones")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                violating drones
            </button>

            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/getViolatingDronesWithPilotInfo")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                getViolatingDronesWithPilotInfo
            </button>
            <button
                onClick={async () => {
                    const res: any = await fetch("http://localhost:5001/clearPilotsOverTenMinutes")
                    const data = await res.json()
                    console.log(data)
                }}
            >
                clearPilotsOverTenMinutes
            </button>
        </>
    )
}

export default Buttons
