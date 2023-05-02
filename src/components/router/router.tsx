import {privateRoutes, publicRoutes} from "./routes";
import {Navigate, Outlet, Route, Routes} from "react-router";
import {useEffect, useState} from "react";
import userStore from "@store/User/userStore";
import {LoginPage} from "@pages/LoginPage/LoginPage";

export const PrivateOutlet = () => {
    const auth = userStore.isAuth
    return auth ? <Outlet/> : <Navigate to={'/login'}/>
}
export const AppRouter = () => {

    return <div>
        <Routes>
            {publicRoutes.map(route =>
                <Route path={route.path} element={<route.element/>} key={route.path}/>
            )}
            <Route path={'/'} element={<PrivateOutlet/>}>
                {privateRoutes.map(route =>
                    <Route path={route.path} element={<route.element/>} key={route.path}/>
                )}
            </Route>
        </Routes>
    </div>

    // return userStore.isAuth ?
    //     (
    //         <div>
    //             <Routes>
    //                 {privateRoutes.map(route =>
    //                     <Route path={route.path} element={<route.element/>} key={route.path}/>
    //                 )}
    //                 <Route path="/*" element={<Navigate to="/home" replace/>}/>
    //             </Routes>
    //         </div>
    //     ) : (
    //         <div>
    //             <Routes>
    //                 {publicRoutes.map(route =>
    //                     <Route path={route.path} element={<route.element/>} key={route.path}/>
    //                 )}
    //                 <Route path="/*" element={<Navigate to="/login" replace/>}/>
    //             </Routes>
    //         </div>
    //     )

}