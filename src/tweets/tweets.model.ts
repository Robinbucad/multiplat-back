import {Collection, Db, MongoClient, ObjectId} from 'mongodb'
import dotenv from 'dotenv'
import { Tweet } from '../TYPES'
dotenv.config()

const DATA_BASE_TEST = process.env.MONGO_DB_TEST
const DATA_BASE_DEV = process.env.MONGO_DB_DEV

export const client = new MongoClient(process.env.MONGO_DB_URI)
const DATABASE_NAME = process.env.NODE_ENV === 'test' ? DATA_BASE_TEST : DATA_BASE_DEV
const COLLECTION_NAME = process.env.NODE_ENV === 'test' ? 'tweets-test' : 'tweets'

export const createTweet = async(tweet:Tweet) => {
    try{
        await client.connect()
        const db:Db = client.db(DATABASE_NAME)
        const tweets:Collection = db.collection(COLLECTION_NAME)
        return await tweets.insertOne(tweet)

    }catch(err){
        console.error("Create tweet error", err)
    }finally{
        await client.close()
    }
}

export const retrieveTweetsByUser = async(id:string) => {
    try{
        await client.connect()
        const db:Db = client.db(DATABASE_NAME)
        const tweets:Collection = db.collection(COLLECTION_NAME)

        return await tweets.find({user:id}).toArray()

    }catch(err){
        console.error("Retrieve tweet error", err)
    }finally{
        await client.close()
    }
}