import mongoose from 'mongoose';

type ConnectionObject = {
    isConnected?: number;
}

const connection: ConnectionObject = {};

async function dbConnect(): Promise<typeof mongoose> {
    if (connection.isConnected) {
        console.log("Already Connected");
        return mongoose;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '');
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
        return mongoose;
    } catch (error) {
        console.log('Connection Failed', error);
        process.exit(1);
    }
}

export default dbConnect;
