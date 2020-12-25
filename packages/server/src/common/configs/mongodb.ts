import path from 'path'
import dotenv from 'dotenv'
dotenv.config({ path: path.join(__dirname, '..', '..', '..', '.env') })

export const mongodbURI = process.env.MONGODB_URI as string
export const mongodbURITest = process.env.MONGODB_URI_TEST as string
