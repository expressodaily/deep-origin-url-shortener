import { useEffect } from 'react';
import { fetchUrlHistory } from '../api/urlHistory';
import { useUrlContext } from '../context/UrlContext';

export const useUrlHistory = (email: string, token: string) => {
    const { setUrls, setLoading, setError } = useUrlContext();

    useEffect(() => {
        const loadHistory = async () => {
            setLoading(true);
            setError('');
            try {
                const history = await fetchUrlHistory(email, token);
                setUrls(history);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, [email, token, setUrls, setLoading, setError]);

    return { setUrls };
};
