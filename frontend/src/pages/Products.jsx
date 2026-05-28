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
        <div
            style={{
                padding: "2rem",
                paddingBottom: "5rem",
            }}
        >
            <h1>Products</h1>

            <h3 style={{ marginTop: "1rem" }}>
                Total Products: {products.length}
            </h3>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
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
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "220px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />

                        <h3
                            style={{
                                marginTop: "1rem",
                                minHeight: "50px",
                            }}
                        >
                            {product.name}
                        </h3>

                        <p
                            style={{
                                marginTop: "0.5rem",
                                color: "#555",
                                minHeight: "90px",
                                lineHeight: "1.5",
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

                        <p
                            style={{
                                marginTop: "0.5rem",
                                marginBottom: "1rem",
                            }}
                        >
                            Stock: {product.stock}
                        </p>

                        <button
                            style={{
                                marginTop: "auto",
                                padding: "0.75rem",
                                background:
                                    product.stock === 0
                                        ? "#9ca3af"
                                        : "#111827",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor:
                                    product.stock === 0
                                        ? "not-allowed"
                                        : "pointer",
                            }}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;