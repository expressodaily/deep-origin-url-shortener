import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUrlHistory = async (email: string, token: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/shortenurl`, {
            params: { email },
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data.data;
        
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Error fetching URL history');
    }
};

export const copyUrl = async (shortCode: string) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/shortenurl/${shortCode}/copy`);

        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Error copying URL');
    }
}

export const deleteUrl = async (shortCode: string, token: string) => {
    try {
        await axios.delete(`${API_BASE_URL}/shortenurl/${shortCode}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Error deleting URL');
    }
};

export const editUrl = async (oldCode: string, newCode: string) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/shortenurl/${oldCode}/edit`,
            { new_code: newCode }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response.data.error || 'Error editing URL');
    }
};
