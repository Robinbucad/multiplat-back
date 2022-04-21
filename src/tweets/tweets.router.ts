import express from 'express'
import {delTweetCtrl, getTweetsByUserCtrl, getTweetsCtrl, postTweetsCtrl} from './tweets.controller'

const router = express.Router()

router.route('/')
    .get(getTweetsCtrl)
    .post(postTweetsCtrl)

router.route('/:id')
    .get(getTweetsByUserCtrl)
    .delete(delTweetCtrl)


export default router