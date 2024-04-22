import React,{useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import isAuthAdmin from '../../utils/isAuthAdmin';



function AdminPrivateRoute({children}) {
    const [isAuthenticate, setIsAuthenticate] = useState({
        'is_authenticate' : false,
        'is_admin' : false
    })
    const [isLoading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchData = async () => {
            const authInfo = await isAuthAdmin();
            console.log(authInfo)
            setIsAuthenticate({
                'is_authenticated' :authInfo.isAuthenticated,
                'is_admin': authInfo.isAdmin,
            });
            setLoading(false);
            console.log()
        };
        fetchData();
    },[])

    if (isLoading){
        return <div>Loading ...</div>
    }

    if (!isAuthenticate.is_authenticated){
        console.log("here");
        return <Navigate to="/admin/"/>;
    }

    if ((!isAuthenticate.is_admin)){
        console.log("herll");
        console.log(isAuthenticate.is_admin)
        return <Navigate to="/admin"/>;
    }

    if ((isAuthenticate && !isAuthenticate.is_admin)){
        console.log("heree");
        return <Navigate to="/home"/>;

    }

  return children
}

export default AdminPrivateRoute
