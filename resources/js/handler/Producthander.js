import { ProductService } from "../service/ProductService";
import Swal from "sweetalert2";


export const ProductHandler = {

    async getAllProducts() {
        let products = await ProductService.getAllProducts();
        return products;
    },

    async postProduct(newProduct) {
        try {
            const response = await ProductService.postProduct(newProduct);
            if (response && response.data) {
                Swal.fire("¡Producto creado correctamente!");
                return response.data;
            } else {
                throw new Error('Error al enviar el producto');
            }
        } catch (error) {
            console.error("Error al enviar el producto:", error);
            throw error;
        }
    },
    async updateProduct(productId, updatedProductData) {
        try {
            const updatedProduct = await ProductService.updateProduct(productId, updatedProductData);
            Swal.fire("¡Producto actualizado!");
            return updatedProduct;
        } catch (error) {
            console.error(`Error al actualizar el producto con ID ${productId}:`, error);
            throw error;
        }
    },
    async deleteProduct(productId) {
        try {

            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "¡No podrás revertir esto!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, eliminarlo",
                cancelButtonText: "Cancelar",
            });

            if (result.isConfirmed) {
                const response = await ProductService.deleteProduct(productId);
                Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
                return response.data;
            } else {
                throw new Error('Eliminación cancelada por el usuario');
            }
        } catch (error) {
            console.error(`Error al eliminar el producto con ID ${productId}:`, error);
            throw error;
        }
    },
}
export default ProductHandler;
