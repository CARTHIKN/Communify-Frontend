import { jwtDecode } from "jwt-decode";
import axios from "axios";



const updateAdminToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    console.log("refres token" , refreshToken);
    const baseUrl = "http://127.0.0.1:8000";
    console.log("-----------");
    try {
        const res = await axios.post(baseUrl + "/api/token/refresh/", {
            refresh: refreshToken,
        });
        console.log("helll");
        console.log(res.status)

        if (res.status === 200) {
            console.log("success");
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);
            return res
        } else {
            console.log("else");
            return res
        }
    
    } catch (error) {
        return false
    }
};

const fetchisAdmin = async () => {
    const token = localStorage.getItem("access");
    console.log(token);
    const baseUrl = "http://127.0.0.1:8000";
    try {
        const res = await axios.get(baseUrl + "/api/user/details/", {
            headers: {
                Authorization: `Bearer ${token}`, // Note the space after Bearer
                Accept: "application/json",
                "Content-Type": "application/json", // Corrected typo in "application/json"
            },
        });
        console.log("here is the res for is Admin")
        console.log(res.data);
        return res.data.isAdmin; // Assuming your response has an "isAdmin" field
    } catch (error) {
        console.log("erroooor", error);
        return false;
    }
};

const isAuthAdmin = async () => {
    const accessToken = localStorage.getItem("access");
    console.log("access token", accessToken);

    if (!accessToken) {
        return {name:null,
         isAuthenticated: false, isAdmin:false}
    }

    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);

    if (decoded.exp > currentTime) {
        let checkAdmin = await fetchisAdmin();
        console.log("is Admin is calling");
        console.log("token is valid");

        return{
            username :decoded.username,
            isAuthenticated :true,
            isAdmin : checkAdmin,
        };

    } else {
        console.log("token is not valid");
        const updateSuccess = await 
        console.log("before the call of updateAdmintoken");
        updateAdminToken();

        if (updateSuccess) {
            let decoded = jwtDecode(accessToken);
            let checkAdmin = await
            fetchisAdmin();
            return {
                name : null,
                isAuthenticated :false,
                isAdmin: false

            }
        }
    }
}

export default isAuthAdmin;