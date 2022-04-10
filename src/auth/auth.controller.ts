import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { createUser, getUserbyEmailNoStatus, retrieveSuccessByEmailAndPassword, validateUser } from "../users/users.model"
import { encodePassword, generateValidationToken } from "./auth.utils";
import {createValidationToken, deleteValidationToken, retrieveValidationToken} from './auth.model'

import { sendValidationEmail } from "../adapters/email"
import { jwt_secret } from './auth.secret'
import { LoginBody, UserModel, ResponseApp, TokenGiven, ValidateToken } from '../TYPES';

export const registerCtrl = async(req:Request<UserModel>,res:Response<ResponseApp>) =>{
   
    try{
     
        const user = await getUserbyEmailNoStatus(req.body.email)
        if(user === null){
            req.body.password = encodePassword(req.body.password)
            await createUser({...req.body, status: 'PENDING_VALIDATION' ,file:''})
            const token:string = generateValidationToken()
     
            await createValidationToken(token,req.body.email)
            
            sendValidationEmail(req.body.email, `http://localhost:4000/auth/validate?token=${token}`)
            res.sendStatus(201);
        }else{
            res.sendStatus(409)
        }
       
    }catch(err){
        console.error(err)
        res.sendStatus(500)
    }
  
}

export const validateEmailCtrl = async(req:Request<ValidateToken>,res:Response<ResponseApp>) => {
    
    const token:any = req.query.token
    const valToken = await retrieveValidationToken(token)
    if(valToken !== null){
        //exsite token
        await deleteValidationToken(token) 
        await validateUser(valToken.user) 
        res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }
   
}


export const loginCtrl = async(req:Request<LoginBody>,res:Response<TokenGiven>) => {
    const {email, password} = req.body

    const user = await retrieveSuccessByEmailAndPassword(email,encodePassword(password))

    if(user !== null){
        // existe usuario
        const token = jwt.sign({email:user.email},jwt_secret)
        res.status(201).json({access_token:token})
    }else{
        res.sendStatus(404)
    }
 
}