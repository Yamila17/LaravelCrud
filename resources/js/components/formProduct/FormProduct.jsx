import React, { useState } from "react";
import ProductHandler from "../../handler/Producthander";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";

const FormProduct = ({ onAddProduct }) => {

    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!productName || !productPrice) {
            Swal.fire("¡Producto actualizado!");
            return;
        }

        const newProduct = {
            name: productName,
            price: productPrice,
        };

        try {

            await ProductHandler.postProduct(newProduct);
            const updatedProducts = await ProductHandler.getAllProducts();

            onAddProduct(updatedProducts);

            setProductName("");
            setProductPrice("");
        } catch (error) {

            console.error("Error al agregar el producto:", error);
        }
    };

    return (
        <>
        <Container>
            <Row className="justify-content-center">
                <Col xs={10} md={8} lg={6}>
                    <Card border="lightgray" className="mt-3 shadow">
                        <Card.Body>
                            <Card.Title className="text-center">Ingrese los detalles del producto</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label>Nombre del artículo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingrese el precio"
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="dark" type="submit">
                                        Enviar
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default FormProduct;
