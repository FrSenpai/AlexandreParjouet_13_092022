import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import { post, put } from "../utils/http-methods";

export function login(email: string, password: string) {
    return post("http://localhost:3001/api/v1/user/login", { email, password });
}

export function getUserProfile() {
    return post("http://localhost:3001/api/v1/user/profile")
}

export function updateUserProfile(firstName: string, lastName: string) {
    return put("http://localhost:3001/api/v1/user/profile", { firstName, lastName });
} 

export function isLogged(token:string, expiration:number) {
    return !(token === null || !(DateTime.now().toMillis() < expiration))
}