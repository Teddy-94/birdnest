import mongoose, { Document } from 'mongoose';

export interface Drone extends Document {
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
}

const droneSchema = new mongoose.Schema({
    serialNumber: { type: String, required: true },
    model: { type: String },
    manufacturer: { type: String },
    mac: { type: String },
    ipv4: { type: String },
    ipv6: { type: String },
    firmware: { type: String },
    positionY: { type: Number },
    positionX: { type: Number },
    altitude: { type: String },
});


const DroneModel = mongoose.model<Drone>('Drone', droneSchema);

export default DroneModel;