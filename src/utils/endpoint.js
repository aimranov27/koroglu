/*
 * Файл с endpoint-ами к бекенду
 */
const API = "/api/v1";

export default {
    currentUser:  API + "/current_user",
    submitInfo: API + "/torrent/process"
};