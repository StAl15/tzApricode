import {useEffect, useMemo, useState} from "react";
import userStore, {initialUserState} from "@store/User/userStore";
import {IUserFormFields} from "@models/users/IUser";
import {useNavigate} from "react-router";
import {filterMode} from "@store/Todo/todoStore";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel, Radio,
    RadioGroup,
    TextField
} from "@mui/material";
import {useQuery} from "react-query";
import todoStore from "@store/Todo/todoStore";
import styles from './index.module.scss'

export const LoginPage: React.FC<{}> = props => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const user: IUserFormFields = {
        username: login,
        password: password
    }
    const navigate = useNavigate()

    const {data, isLoading, refetch, error} = useQuery('loginData', () => userStore.initializeUser(user)
            .then(r => r.data)
            .then(data => {
                if (data[0] != null) {
                    userStore.user = data[0]
                    userStore.isAuth = true
                }
                if (userStore.isAuth) {
                    navigate('/home')
                } else {
                    alert('Bad login or pass')
                }
            }), {
            refetchOnWindowFocus: false,
            enabled: false
        }
    )

    const handleLogin = () => {
        refetch()
    }


    return isLoading
        ? (<CircularProgress/>)
        :
        (
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    <h1>
                        Hello, It's Login page
                    </h1>

                    <Box className={styles.loginForm}>
                        <TextField className={styles.textField} type={"text"} value={login}
                                   onChange={(e) => setLogin(e.target.value)}
                                   placeholder={'login'}/>
                        <TextField className={styles.textField} type={"text"} value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   placeholder={'password'}/>
                        <Button variant={"outlined"} onClick={() => handleLogin()}>send</Button>
                    </Box>

                </div>
            </div>
        );
};