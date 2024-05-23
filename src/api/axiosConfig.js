import axios from "axios";

export default axios.create({
    baseURL:'https://11f1-73-158-238-72.ngrok-free.app',
    headers: {"ngrok-skip-browser-warning": "true"}
});