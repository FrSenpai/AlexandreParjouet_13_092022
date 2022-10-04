import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { post, put } from "../utils/http-methods";
import useSWR from "swr"
import { setUser } from '../store/reducers/user/UserReducer';

export function login(email: string, password: string) {
    return post("http://localhost:3001/api/v1/user/login", { email, password });
}

export function getUserProfile() {
    // const { data, error } = useSWR('http://localhost:3001/api/v1/user/profile', post)
    // return {
    //     data,
    //     isLoading: !error && !data,
    //     isError: error
    //   }
    return post("http://localhost:3001/api/v1/user/profile")
            


}

export function updateUserProfile(firstName: string, lastName: string) {
    return put("http://localhost:3001/api/v1/user/profile", { firstName, lastName });
} 