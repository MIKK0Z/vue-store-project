import type { Collection, Db } from "mongodb";
import { connectToMongoDB } from "./connect";

let db: Db;
let usersCollection: Collection;

const connect = async () => {
    try {
        db = await connectToMongoDB();
        usersCollection = await db.collection("users");
    } catch (_err) {
        console.log("check if mongo service is running");
    } 
};

const getUsers = async () => {
    const users = await usersCollection.find().toArray();
    return users;
};

const getUser = async (email: string) => {
    const user = await usersCollection.find({ email }).toArray();
    return user;
};

const createUser = async (email: string, password: string) => {
    const user = await usersCollection.insertOne({ email, password });
    return user;
};

connect();

export {
    getUsers,
    getUser,
    createUser,
};
