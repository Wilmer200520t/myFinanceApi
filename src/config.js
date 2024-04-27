import dotenv from 'dotenv'

dotenv.config() //llama ala varibles de env
export default {
    app : {
        port : process.env.PORT || 3000
    }
}