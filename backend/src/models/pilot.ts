import mongoose, { Document } from 'mongoose';

export interface Pilot extends Document {
    pilotId: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    createdDt?: string;
    email?: string;
    lastSeen?: string;
}

const pilotSchema = new mongoose.Schema({
    pilotId: { type: String, required: true},
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    createdDt: { type: String },
    email: { type: String },
    lastSeen: { type: String, required: true },
});

const PilotModel = mongoose.model<Pilot>('Pilot', pilotSchema);

export default PilotModel;