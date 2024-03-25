import { Enums, S } from "@/types";

import mongoose from "mongoose";

const Schema = new mongoose.Schema<S.IScrapyDocument, S.IScrapyModel>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    service: {
        type: String,
        required: true,
        enum: Enums.Services,
        
    },
    story: {
        type: String,
        required: true,
        trim: true,
    },
    poster: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: Enums.Status,
        default: Enums.Status.PENDING
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    operationId: {
        type: String,
        required: true,
    },
    quality: {
        type: String,
        required: true,
        enum: Enums.Quality,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    source: {
        type: String,
        required: true,
        enum: Enums.Sources,
    },
    result: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result',
    },
    logo: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    episodes_count: {
        type: Number,
        required: true,
        default: 0
    },
    progress:{
        type: Number,
        default: 0
    
    },
    progressMessage:{
        type: String,
        default: 'Pending'
    }
    
},{
    timestamps: true,
    versionKey: false
})


export const Scrapy = mongoose.model<S.IScrapyDocument, S.IScrapyModel>('Scrapy', Schema);

