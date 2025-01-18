import { MongoClient } from "mongodb";

const connectToMongoDB = async () => {
    const client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    const db = client.db("store_project");
    return db;
};

export { connectToMongoDB };