import axios, { AxiosInstance } from "axios"

// Create a reusable Axios instance
const axi = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Client-Type": "web",
    },
})

export default axi
