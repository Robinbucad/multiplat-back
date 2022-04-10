import { Request, Response } from "express"
import { DeleteAllUsers, retrieveAllUsers } from "./users.model"

export const getAllUsersCtrl = async(req:Request,res:Response):Promise<void> => {
    const users =await retrieveAllUsers()
    res.json(users)
}

export const deleteAllUsersCtrl = async(req:Request,res:Response):Promise<void> => {
    const users =await DeleteAllUsers()
    res.json(users)
}