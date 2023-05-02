import {makeAutoObservable} from "mobx";
import {IUser, IUserFormFields} from "@models/users/IUser";
import axios from "axios";
import {useNavigate} from "react-router";

export const initialUserState = {userId: null, username: "", password: ""}

class UserStore {
    user: IUser = initialUserState
    isAuth = false

    constructor() {
        makeAutoObservable(this.user, this.isAuth)
    }

    initializeUser(user_: IUserFormFields) {
        return axios.get(`http://localhost:3000/users?username=${user_.username}&password=${user_.password}`)
    }

    logoutUser() {
        this.user = initialUserState
        this.isAuth = false
    }
}

export default new UserStore();