import { post } from "../utils/http-methods";

export function login(email:string, password:string) {
    return post("http://localhost:3001/api/v1/user/login", {email, password});
}