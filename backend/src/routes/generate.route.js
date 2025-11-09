import express from 'express'
import authUser from '../middleware/auth.js'
import { generateImageHandler } from '../controllers/generate.controller.js'

const generateRouter = express.Router()

generateRouter.post('/', authUser, generateImageHandler)

export default generateRouter