import { jwtDecode } from 'jwt-decode'

export default function isTokenValide(token) {
//token bk = id /role/ user

    try {
        const decode = jwtDecode(token);
        return decode.exp > Date.now() / 1000;
    } catch (error) {
        return false
    }
}

