import axios, { AxiosInstance } from "axios"

// Create a reusable Axios instance
const axi = axios.create({
    baseURL: "https://api.byteapp.tech/api/v1",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        withCredentials: true,
        "Client-Type": "web",
    },
})

export default axi
