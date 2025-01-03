import { apiConnector } from "../apiConnector";
import { userEndpoints } from "../api.js";
import toast from "react-hot-toast";
import { setLoading, setToken, setUser } from "../../Slice/Profile/profile.js";

const { REGISTER_USER, LOGIN_USER, LOGOUT_USER } = userEndpoints;

export function signup(data, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", REGISTER_USER, data);
            // console.log("Response: ", response);
            toast.success("User registered successfully");
            navigate("/login");
        } catch (e) {
            toast.error(e.message ||"Error while registering user");
        }
        finally
        {
            toast.dismiss(toastId);
        }
    };
}

export function login(data, navigate) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        // console.log(data);
        try {
            const response = await apiConnector("POST", LOGIN_USER, data);
            console.log("Response: ", response);

            // saving token in store
            dispatch(setToken(response.data.data.accessToken));

            // saving user in store
            dispatch(setUser(response.data.data.user));

            // saving user in localStorage
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            );

            // saving accessToken in localStorage
            localStorage.setItem(
                "accessToken",
                JSON.stringify(response.data.data.accessToken)
            );
            toast.success("User logged in successfully");
            navigate(`/user/${response.data.data.user.uniqueId}`);
        } catch (e) {
            toast.error("Error while logging in user");
        }
    };
}

export function logout(token, navigate) {
    return async (dispatch) => {
        console.log("Hello")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "POST",
                LOGOUT_USER,
                {},
                {
                    // "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );
            // console.log("Logout:", response);
            // console.log("Logout Response: ", response);
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setToken(null));
            dispatch(setUser(null));

            // saving token in store
            dispatch(setToken(response.data.data.accessToken));

            // removing user in localStorage
            localStorage.removeItem("user");

            // removing accessToken in localStorage
            localStorage.removeItem("accessToken");
            toast.success("User logged out successfully");
            navigate("/login");
        } catch (e) {
            toast.error("Error while logging out user");
        }
    };
}