const BASE_URL = "https://google-drive-backend-3p6k.onrender.com";

export const userEndpoints = {
    REGISTER_USER: BASE_URL + "/user/register",
    LOGIN_USER: BASE_URL + "/user/login",
    LOGOUT_USER: BASE_URL + "/user/logout",
    REFRESH_TOKEN: BASE_URL + "/user/refreshToken",
    CHANGE_PASSWORD: BASE_URL + "/user/changePassword",
    GET_CURRENT_USER: BASE_URL + "/user/getCurrentUser",
    UPDATE_ACCOUNT_DETAILS: BASE_URL + "/user/updateAccountDetails",
    UPDATE_AVATAR: BASE_URL + "/user/updateUserAvatar",
}

export const fileEndpoints = {
    UPLOAD_FILE: BASE_URL + "/file/uploadFile",
    EDIT_FILE_NAME: BASE_URL + "/file/editFileName",
    DELETE_FILE: BASE_URL + "/file/deleteFile",
    SEARCH_FILE: BASE_URL + "/file/searchFile",
    GET_FILE_BY_USER: BASE_URL + "/file/getFileByUser",
}
