import { ObjectId } from "mongodb"

export type UserModel = {
    email:string,
    name:string
    username:string,
    password:string,
    date:string
}

export type ResponseApp = 200 | 201 | 400 | 404 | 409 | 500

export type ValidateToken = {
    token:string
}

export type TokenGiven = {
    access_token:string
}

export type LoginBody = {
    email:'string',
    password:'string'
}

export type Tweet = {
    tweet:string
    user:string
    date:string
    _id?:ObjectId
}

