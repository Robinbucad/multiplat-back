import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const DATA_BASE_TEST = process.env.MONGO_DB_TEST
const DATA_BASE_DEV = process.env.MONGO_DB_DEV

const client = new MongoClient(process.env.MONGO_DB_URI)
const DATABASE_NAME = process.env.NODE_ENV === 'test' ? DATA_BASE_TEST : DATA_BASE_DEV
const COLLECTION_NAME = process.env.NODE_ENV === 'test' ? 'validate-token-test' : 'validate-token'

export const createValidationToken = async(token:string,userName:any) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const tokens = db.collection(COLLECTION_NAME)
        return await tokens.insertOne({
            token,
            user:userName
        });
    }catch(err){
        console.error(err)
    }finally{
       await client.close()
    }
}

// esto devuelve el token o null si este no existe 

export const retrieveValidationToken = async(token:string) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const tokens = db.collection(COLLECTION_NAME)
        return await tokens.findOne({token});
    }catch(err){
        console.error(err)
    }finally{
        await client.close()
    }
}

// borra el token de la BBDD

export const deleteValidationToken = async(token:string) => {
    try{
        await client.connect()
        const db = client.db(DATABASE_NAME)
        const tokens = db.collection(COLLECTION_NAME)
        return await tokens.deleteOne({token});
    }catch(err){
        console.error(err)
    }finally{
        await  client.close()
    }
}
