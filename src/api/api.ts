import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://ecomplazza.serveftp.com/api/products',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProductsByCategory = async (category: string, subcategory: string) => {
    try {
        const response = await apiClient.get(`/products`, {
            params: {
                category,
                subcategory
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch products', error);
        throw error;
    }
};
