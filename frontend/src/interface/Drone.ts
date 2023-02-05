export interface DroneData {
    drone: Drone[];
}

export interface Drone {
    serialNumber: string;
    model?: string;
    manufacturer?: string;
    mac?: string;
    ipv4?: string;
    ipv6?: string;
    firmware?: string;
    positionY?: number;
    positionX?: number;
    altitude?: number;
    distance?: number;
    closestDistance?: number;
    lastSeen: number;
    pilot: {
        pilotId: string;
        firstName?: string;
        lastName?: string;
        phoneNumber?: string;
        createdDt?: string;
        email?: string;
    };
}
