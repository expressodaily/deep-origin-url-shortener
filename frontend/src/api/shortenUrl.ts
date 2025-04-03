import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const shortenUrl = async (url: string, email: string, token: string) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/shortenurl`,
            { url, email },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data.data.short_code;
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Error shortening URL');
    }
};
