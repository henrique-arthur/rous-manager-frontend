import React, { useEffect } from 'react';
import {useAuthentication} from '../contexts/auth';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

export default function Routes(){
    const { estaLogado } = useAuthentication();

    return estaLogado ? <AppRoutes/> : <AuthRoutes/>;
}

