import { Query } from '../types/types.d';

// CONSULTAS A API
const query = async ({ url, setLoading, setButtonLoading, setIsVisible }: Query) => {
    try {
        setLoading(true);
        setButtonLoading(false);
        setIsVisible(false);

        const response = await fetch(url);

        // Si la respuesta no es OK, lanza un error
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

        const res = await response.json();

        return res;
    } catch {
        setLoading(false);
    } finally {
        setLoading(false);
        setButtonLoading(false);
    }
};

export default query;

