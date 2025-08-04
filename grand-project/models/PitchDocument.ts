// /grand-project/models/PitchDocument.ts

import mongoose, { Schema, Document, models, Model } from 'mongoose';

// --- NEW: Define TypeScript interfaces for your data shapes ---
interface IAiResponse {
  elevatorPitch: string;
  problem: string;
  solution: string;
  targetMarket: string;
  uniqueSellingPoint: string;
  callToAction: string;
}

interface IUserInput {
  idea: string;
  problem: string;
  audience: string;
  features: string;
  usp: string;
  goal: string;
  tone: string;
}

// --- UPDATED: Your main document interface now uses the shapes above ---
export interface IPitchDocument extends Document {
  pitchId: string;
  userId: string;
  userInput: IUserInput;      // Use the interface for the data shape
  aiResponse: IAiResponse;      // Use the interface for the data shape
  createdAt: Date;
}

// --- NO CHANGE NEEDED BELOW ---
// The Mongoose schemas for the database are correct as they were.
const UserInputSchema = new Schema<IUserInput>({
    idea: String,
    problem: String,
    audience: String,
    features: String,
    usp: String,
    goal: String,
    tone: String,
}, { _id: false });

const AiResponseSchema = new Schema<IAiResponse>({
    elevatorPitch: String,
    problem: String,
    solution: String,
    targetMarket: String,
    uniqueSellingPoint: String,
    callToAction: String,
}, { _id: false });

const PitchDocumentSchema: Schema<IPitchDocument> = new Schema({
  pitchId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  userInput: { type: UserInputSchema, required: true },
  aiResponse: { type: AiResponseSchema, required: true },
}, { timestamps: true });

const PitchDocument = (models.PitchDocument as Model<IPitchDocument, {}, {}, {}>) || mongoose.model<IPitchDocument>('PitchDocument', PitchDocumentSchema);

export default PitchDocument;