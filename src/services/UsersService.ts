import { post } from "../utils/http-methods";
import useSWR from "swr"

export function login(email: string, password: string) {
    return post("http://localhost:3001/api/v1/user/login", { email, password });
}

export function useUserProfile(){
        const { data, error } = useSWR('http://localhost:3001/api/v1/user/profile', post)
        return {
            data,
            isLoading: !error && !data,
            isError: error
          }


}