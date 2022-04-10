import crypto from 'crypto'
import dotenv from 'dotenv'
dotenv.config()

export const encodePassword = (pass:string) => {
    return crypto.pbkdf2Sync(pass, process.env.AUTH_SECRET,1000, 64, `sha512`).toString(`hex`);
}

export const generateValidationToken = () => {
    return crypto.randomBytes(128).toString(`hex`)
}