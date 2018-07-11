import dotenv from 'dotenv'
import render from './graph'

dotenv.config()
render(process.env.ITUNES_LIBRARY)
