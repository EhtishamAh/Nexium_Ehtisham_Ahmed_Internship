// /grand-project/models/PitchDocument.ts

import mongoose, { Schema, Document, models, Model } from 'mongoose';

// Define the structure of the objects to be stored
const UserInputSchema = new Schema({
    idea: String,
    problem: String,
    audience: String,
    features: String,
    usp: String,
    goal: String,
    tone: String,
}, { _id: false });

const AiResponseSchema = new Schema({
    elevatorPitch: String,
    problem: String,
    solution: String,
    targetMarket: String,
    uniqueSellingPoint: String,
    callToAction: String,
}, { _id: false });

export interface IPitchDocument extends Document {
  pitchId: string; // This will link to the Supabase pitch ID
  userId: string;
  userInput: typeof UserInputSchema;
  aiResponse: typeof AiResponseSchema;
  createdAt: Date;
}

const PitchDocumentSchema: Schema<IPitchDocument> = new Schema({
  pitchId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  userInput: { type: UserInputSchema, required: true },
  aiResponse: { type: AiResponseSchema, required: true },
}, { timestamps: true }); // timestamps adds createdAt and updatedAt

// Prevent model overwrite in Next.js hot-reloading environment
const PitchDocument = (models.PitchDocument as Model<IPitchDocument, {}, {}, {}>) || mongoose.model<IPitchDocument>('PitchDocument', PitchDocumentSchema);

export default PitchDocument;