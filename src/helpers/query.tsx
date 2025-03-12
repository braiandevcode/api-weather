import { IQuery } from '../types/types.d';

// CONSULTAS A API
const query = async ({ url, setLoading, setButtonLoading, setIsVisible }: IQuery) => {
    try {
        setLoading(true);
        setButtonLoading(false);
        setIsVisible(false);

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const res = await response.json();

        return res;
    } catch {
        setIsVisible(true);
    } finally {
        setLoading(false);
        setButtonLoading(false);
    }
};

export default query;
