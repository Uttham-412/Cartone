import { useEffect, useState } from "react";

import axios from "axios";

function Products() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/products"
                );

                setProducts(response.data);
            } catch (error) {
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: "2rem" }}>
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "2rem" }}>
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Products</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1.5rem",
                    marginTop: "2rem",
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            background: "white",
                            padding: "1rem",
                            borderRadius: "10px",
                            boxShadow:
                                "0 2px 10px rgba(0,0,0,0.1)",
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />

                        <h3 style={{ marginTop: "1rem" }}>
                            {product.name}
                        </h3>

                        <p
                            style={{
                                marginTop: "0.5rem",
                                color: "#555",
                            }}
                        >
                            {product.description}
                        </p>

                        <h2
                            style={{
                                marginTop: "1rem",
                                color: "#111827",
                            }}
                        >
                            ${product.price}
                        </h2>

                        <p style={{ marginTop: "0.5rem" }}>
                            Stock: {product.stock}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;