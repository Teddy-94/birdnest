import mongoose from 'mongoose';
import "dotenv/config";
mongoose.pluralize(null)

export const databaseConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI!)
        console.log(`Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}