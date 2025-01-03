import { apiConnector } from "../apiConnector";
import { fileEndpoints } from "../api";
import toast from "react-hot-toast";
import { setLoading } from "../../Slice/Profile/profile";

const {
    UPLOAD_FILE,
    EDIT_FILE_NAME,
    DELETE_FILE,
    SEARCH_FILE,
    GET_FILE_BY_USER,
} = fileEndpoints;

export function uploadFile(data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "POST",
                UPLOAD_FILE,
                data,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log("Response file uploaded: ", response);
            toast.success("File uploaded Successfully");
            return response.data.data;
        } catch (e) {
            toast.error(e.message || "Error while uploading file");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function getFileByUser(token)
{
    return async (dispatch) => {
        console.log(token)
        const toastId = toast.loading("Loading");
        try
        {
            const response = await apiConnector("GET",GET_FILE_BY_USER,{},{
                Authorization: `Bearer ${token}`,
            });
            console.log("Response",response)
            toast.success("File fetched successfully");
            return response.data.data;
        }
        catch(e)
        {
            toast.success("Error while fetching files");
        }
        finally
        {
            toast.dismiss(toastId);
        }
    }
}

export function editFile(data, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        console.log("Data",data)
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "PATCH",
                EDIT_FILE_NAME,
                data,
                {
                    // "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log("Response file edited: ", response);
            toast.success("File updated Successfully");
            return response.data.data;
        } catch (e) {
            toast.error(e.message || "Error while updating file");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function deleteFile(public_id, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "DELETE",
                DELETE_FILE,
                {public_id: public_id},
                {
                    // "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log("Response file edited: ", response);
            toast.success("File deleted Successfully");
            return response.data.data;
        } catch (e) {
            toast.error(e.message || "Error while updating file");
        } finally {
            toast.dismiss(toastId);
        }
    };
}