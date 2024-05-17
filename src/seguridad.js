import confirmarToken from "../autentificacion/index.js"

export default function chequearToken(){
    function middleware(req, res, next){
        confirmarToken(req)
        next()
    }
    return middleware
}