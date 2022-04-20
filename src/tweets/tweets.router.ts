import express from 'express'
import {getTweetsByUserCtrl, getTweetsCtrl, postTweetsCtrl} from './tweets.controller'

const router = express.Router()

router.route('/')
    .get(getTweetsCtrl)
    .post(postTweetsCtrl)

router.route('/:id')
    .get(getTweetsByUserCtrl)

export default router