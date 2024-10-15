import mongoose from 'mongoose';

const uri = process.env.MONGODB_URL;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

let isConnected; // para rastrear el estado de la conexión

const connectDB = async () => {
    if (isConnected) {
        console.log('Ya estás conectado a la base de datos.');
        return;
    }

    try {
        const db = await mongoose.connect(uri);

        isConnected = db.connections[0].readyState === 1; // Comprobar el estado de la conexión
        console.log('Conectado a MongoDB.');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw new Error('Error al conectar a MongoDB');
    }
};

export default connectDB;
