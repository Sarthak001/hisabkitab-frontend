
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import {useRecoilValue} from 'recoil';
import { authStatus } from '../store/authstore';

const  ProtectedRoutes=() =>{

const authcheck = useRecoilValue(authStatus);

  return authcheck.status ? <Outlet/>: <Navigate to="/login"/>
}

export default ProtectedRoutes;
