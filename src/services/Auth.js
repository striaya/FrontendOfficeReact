import axios from "axios";

// url rest_api
const auth = axios.create({
    baseURL: "http://localhost:8000/api/auth",
});

//  save token to localStorage
auth.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    } 
    return config;
})

auth.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default auth;