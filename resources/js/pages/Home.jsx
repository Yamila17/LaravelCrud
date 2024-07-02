import React, { useState, useEffect } from "react";
import FormProduct from "./../components/formProduct/FormProduct";
import TableProduct from "./../components/tableProducts/TableProduct";
import ProductHandler from "../handler/Producthander";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productData = await ProductHandler.getAllProducts();
            setProducts(productData);
        };

        fetchProducts();
    }, []);

    const addProduct = async (updatedProducts) => {
        setProducts(updatedProducts);
    };

    const handleUpdateProduct = (updatedProduct) => {
        const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
    };
    const handleDeleteProduct = (deletedProductId) => {
        const updatedProducts = products.filter(
            (product) => product.id !== deletedProductId
        );
        setProducts(updatedProducts);
    };

    return (
        <div>
            <Container className="d-flex justify-content-center mt-5">
                <Row>
                    <Col>
                        <h2>Crea Actualiza y Elimina productos :</h2>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-5">
                <Row>
                    <Col>
                        <FormProduct onAddProduct={addProduct} />
                    </Col>
                </Row>
            </Container>

            <Container className="mt-5">
                <Row>
                    <Col>
                        <TableProduct
                            products={products}
                            onUpdate={handleUpdateProduct}
                            onDelete={handleDeleteProduct}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
