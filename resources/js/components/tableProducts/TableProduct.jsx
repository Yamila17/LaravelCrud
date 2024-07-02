import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ProductHandler from "../../handler/Producthander";
import Table from "react-bootstrap/Table";

const TableProduct = ({ products, onUpdate,onDelete }) => {
    const [editedProduct, setEditedProduct] = useState(null);

    const handleEdit = (product) => {
        setEditedProduct({ ...product });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            await ProductHandler.updateProduct(
                editedProduct.id,
                editedProduct
            );
            if (onUpdate) {
                onUpdate(editedProduct);
            }
            setEditedProduct(null);
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await ProductHandler.deleteProduct(productId);
            if (onDelete) {
                onDelete(productId);
            }

            setEditedProduct(null);
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };
    return (
        <Container>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>ID Producto</th>
                                <th>Nombre Producto</th>
                                <th>Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {editedProduct &&
                                        editedProduct.id === product.id ? (
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                value={editedProduct.name}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    <td>
                                        {editedProduct &&
                                        editedProduct.id === product.id ? (
                                            <Form.Control
                                                type="number"
                                                name="price"
                                                value={editedProduct.price}
                                                onChange={handleInputChange}
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td>
                                        {editedProduct &&
                                        editedProduct.id === product.id ? (
                                            <Button
                                                variant="success"
                                                onClick={handleUpdate}>
                                                Guardar
                                            </Button>
                                        ) : (
                                            <Button
                                                className="me-2"
                                                variant="primary"
                                                onClick={() =>
                                                    handleEdit(product)
                                                }
                                            >
                                                Editar
                                            </Button>
                                        )}

                                        <Button

                                            variant="danger"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default TableProduct;
