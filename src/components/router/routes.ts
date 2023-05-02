import {HomePage} from "@pages/HomePage/HomePage";
import {LoginPage} from '@pages/LoginPage/LoginPage';


export const privateRoutes = [
    {path: '/home', element: HomePage},
]

export const publicRoutes = [
    {path: '/login', element: LoginPage},
]