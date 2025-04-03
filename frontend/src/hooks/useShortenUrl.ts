import { useState } from 'react';
import { shortenUrl } from '../api/shortenUrl';

export const useShortenUrl = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleShortenUrl = async (url: string, email: string, token: string) => {
        setLoading(true);
        setError('');
        try {
            const shortCode = await shortenUrl(url, email, token);
            return shortCode;
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { handleShortenUrl, loading, error };
};
