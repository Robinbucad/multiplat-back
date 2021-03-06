import { Request, Response } from "express"
import {  Tweet } from "../TYPES"
import { createTweet, deleteTweet, retrieveTweetsByUser } from "./tweets.model"
export const getTweetsCtrl = async(req:Request, res:Response) => {
    res.sendStatus(201)
}

export const postTweetsCtrl = async(req:Request, res:Response) => {
    const tweet = req.body
    const newTweet = await createTweet(tweet)
    res.json(newTweet)
}

export const getTweetsByUserCtrl = async(req:Request, res:Response) => {
        const {id} = req.params
        const tweetsByUser =await retrieveTweetsByUser(id)
        res.json(tweetsByUser)
    }

export const delTweetCtrl = async(req:Request, res:Response) => {
        const {id} = req.params
        const delTweet = await deleteTweet(id)
        res.json(delTweet)
}