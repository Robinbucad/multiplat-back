import express from 'express'
import { getAllUsersCtrl,deleteAllUsersCtrl } from './users.controller'

const router = express.Router()

router.route('/')
    .get(getAllUsersCtrl)
    .delete(deleteAllUsersCtrl) //Just for the testing

export default router