// src/models/AnalysisResult.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalysisResult extends Document {
    keyword: string;
    totalChecked: number;
    availableCount: number;
    unavailableCount: number;
    processingTime?: number;
    batchSize?: number;
    tldOption?: string;
    createdAt: Date;
    updatedAt: Date;
}

const AnalysisResultSchema = new Schema<IAnalysisResult>(
    {
        keyword: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        totalChecked: {
            type: Number,
            required: true,
            default: 0
        },
        availableCount: {
            type: Number,
            required: true,
            default: 0
        },
        unavailableCount: {
            type: Number,
            required: true,
            default: 0
        },
        processingTime: {
            type: Number
        },
        batchSize: {
            type: Number
        },
        tldOption: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

AnalysisResultSchema.index({ createdAt: -1 });
AnalysisResultSchema.index({ keyword: 1, createdAt: -1 });

export default mongoose.models.AnalysisResult || mongoose.model<IAnalysisResult>('Result', AnalysisResultSchema);
