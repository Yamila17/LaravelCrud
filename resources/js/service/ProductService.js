import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export const ProductService = {
    async getAllProducts() {
        try {
            let response = await apiClient.get("/products");
            let products = response.data;
            return products;
        } catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    },
    async postProduct(newProduct) {
        try {
            const response = await apiClient.post("/products", newProduct, {
                headers: {
                   ...apiClient.defaults.headers.common,
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            return response;
        } catch (error) {
            console.error("Error al enviar el producto:", error);
            throw error;
        }
    },
    async updateProduct(productId, updatedProduct) {
        try {
            const response = await apiClient.put(`/products/${productId}`, updatedProduct, {
                headers: {
                    ...apiClient.defaults.headers.common,
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${productId}:`, error);
            throw error;
        }
    },
    async deleteProduct(productId) {
        try {
            const response = await apiClient.delete(`/products/${productId}`, {
                headers: {
                    ...apiClient.defaults.headers.common,
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            return response.data;
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${productId}:`, error);
            throw error;
        }
    },
};
