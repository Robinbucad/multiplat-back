import { Request, Response } from "express"
import { DeleteAllUsers, retrieveAllUsers, retrieveUserInfoByEmail } from "./users.model"

export const getAllUsersCtrl = async(req:Request,res:Response):Promise<void> => {
    const users =await retrieveAllUsers()
    res.json(users)
}

export const deleteAllUsersCtrl = async(req:Request,res:Response):Promise<void> => {
    const users =await DeleteAllUsers()
    res.json(users)
}

export const getUserInfo = async (req:Request | any,res:Response):Promise<void> => {
  
    try{
    
        const user = await retrieveUserInfoByEmail(req.body.email)
        res.json(user) 
    }
  catch(err){
      console.error(err)
      res.sendStatus(500)
  }
}
