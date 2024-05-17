import jwt from 'jsonwebtoken'
import config from '../src/config.js'

function asignarToken(data){
    return jwt.sign(data, config.jwt.secret)
}

export function confirmarToken(token){
    return jwt.verify(token, config.jwt.secret)
}

export default {
    asignarToken,
    confirmarToken
}