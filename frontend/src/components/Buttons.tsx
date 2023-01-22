const Buttons: React.FC = () => {
    return (
        <>
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
                    console.log("clicked button");
                    
                    const res: any = await fetch("http://localhost:5001/violatingDrones")
                    const data = await res.json()
                    console.log(res)
                    console.log(data)
                }}
            >
                violating drones
            </button>

        </>
    )
}

export default Buttons
