import dotenv from 'dotenv'
dotenv.config()

export const jwt_secret = `${process.env.AUTH_SECRET}`