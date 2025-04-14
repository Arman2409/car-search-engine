import axios, { AxiosInstance } from 'axios';
import { SelectFilter } from '../types/components/filters';

export class Request {
    static instance: Request | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        const requestBaseUrl = import.meta.env.VITE_API_URL;

        this.axiosInstance = axios.create({
            baseURL: requestBaseUrl,
        });

        console.log("Request class initialized with:", requestBaseUrl);
    }

    static getInstance(): Request {
        if (!Request.instance) {
            Request.instance = new Request();
        }
        return Request.instance;
    }

    async getFilterData(type: SelectFilter) {
        return await this.axiosInstance.get(`/cars/${type}`)
            .then(({data}) => data)
            .catch(err => {
                console.error("Failed to get random quote", err);
                return []
            })
    }
}