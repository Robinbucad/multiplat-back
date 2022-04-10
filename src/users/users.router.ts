import express from 'express'
import { getAllUsersCtrl,deleteAllUsersCtrl, getUserInfo } from './users.controller'

const router = express.Router()

router.route('/')
    .get(getAllUsersCtrl)
    .delete(deleteAllUsersCtrl) //Just for the testing

router.route('/single')
    .get(getUserInfo)


export default router