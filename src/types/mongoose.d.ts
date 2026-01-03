// src/types/mongoose.d.ts

import mongoose from 'mongoose';

export interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    namespace NodeJS {
        interface Global {
            mongoose: MongooseCache;
        }
    }

    var mongoose: MongooseCache;
}
