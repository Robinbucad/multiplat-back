import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
import {UserModel} from '../TYPES'

dotenv.config()

const DATA_BASE_TEST = process.env.MONGO_DB_TEST
const DATA_BASE_DEV = process.env.MONGO_DB_DEV

export const client = new MongoClient(process.env.MONGO_DB_URI)
const DATABASE_NAME = process.env.NODE_ENV === 'test' ? DATA_BASE_TEST : DATA_BASE_DEV
const COLLECTION_NAME = process.env.NODE_ENV === 'test' ? 'users-test' : 'users'

export const createUser = async(user:UserModel) => {
    try {
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const users = db.collection(COLLECTION_NAME)
        return await users.insertOne(user);
    } catch (err) {
        console.error(err)
    } finally {
       await client.close()
    }
}

export const getUserbyEmailNoStatus = async (email:string) => { 
    try {
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const users = db.collection(COLLECTION_NAME)
        return await users.findOne({ email });
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
}


export const validateUser = async (email:string) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
       
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            },
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        console.error(err);
    } finally {
       await client.close();
    }
}

export const retrieveSuccessByEmailAndPassword = async (email:string, password:string) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        console.error(err);
    } finally {
       await client.close();
    }
}

export const retrieveUserInfoByEmail = async (email:string) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = { email }
        const options = {projection: {password:0}} 
        return await users.findOne(query,options);
    } catch (err) {
        console.error(err);
    } finally {
       await client.close();
    }
}

export const retrieveAllUsers = async () => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const options = {projection: {password:0}} 
        return await users.find({},options).toArray();
    } catch (err) {
        console.error('Retrieve all users error',err);
    } finally {
       await client.close();
    }
}

export const DeleteAllUsers = async () => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME); 
        return await users.deleteMany({})
    } catch (err) {
        console.error('Retrieve all users error',err);
    } finally {
       await client.close();
    }
}


