
import * as EmailValidator from 'email-validator'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import {jwt_secret} from './auth.secret'

export const validateUser = (req:Request, res:Response,next:NextFunction) => {
    if(EmailValidator.validate(req.body.email)){
        next()
    }else{
        res.status(400).json({error: 'El email no es válido'})
    }
}

export const validateauth = (req:any, res:Response,next:NextFunction) => {
    try{
        const auth = req.header(`Authorization`)
        const token = auth.split(' ')[1]
        const payload:any = jwt.verify(token,jwt_secret)
        req.body.email = payload.email 
        next()
    }catch(err){
        console.error(err)
        res.sendStatus(401)
    }
}