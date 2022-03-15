import env from 'dotenv'
import { connect } from 'mongoose';

env.config()

const db = async () => {
    try {
        const dbconnection = await connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log(`MongoDB connection established : ${dbconnection.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default db;