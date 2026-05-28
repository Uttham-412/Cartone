import {
    useEffect,
    useState,
    useContext,
} from "react";

import axios from "axios";

import { CartContext } from "../context/CartContext";

function Products() {
    const [products, setProducts] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] = useState("");

    const { cartCount, setCartCount } =
        useContext(CartContext);

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
            <div
                style={{
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <h2>Loading products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <h2>{error}</h2>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "2rem",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    marginBottom: "4rem",
                    padding: "3rem 1rem",
                    borderRadius: "24px",
                    background:
                        "linear-gradient(135deg, #2563eb, #1e3a8a)",
                    color: "white",
                    boxShadow:
                        "0 10px 30px rgba(37,99,235,0.3)",
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                    }}
                >
                    Welcome to CART One
                </h1>

                <p
                    style={{
                        marginTop: "1rem",
                        fontSize: "1.2rem",
                        color: "#dbeafe",
                    }}
                >
                    Modern shopping experience
                    with premium products
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "2rem",
                }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        style={{
                            background: "white",
                            borderRadius: "24px",
                            overflow: "hidden",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.08)",
                            transition: "0.3s ease",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{
                                width: "100%",
                                height: "260px",
                                objectFit: "cover",
                            }}
                        />

                        <div
                            style={{
                                padding: "1.5rem",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                        >
                            <h2
                                style={{
                                    fontSize: "1.5rem",
                                    fontWeight: "700",
                                    color: "#111827",
                                }}
                            >
                                {product.name}
                            </h2>

                            <p
                                style={{
                                    marginTop: "1rem",
                                    color: "#6b7280",
                                    lineHeight: "1.7",
                                    minHeight: "80px",
                                }}
                            >
                                {product.description}
                            </p>

                            <div
                                style={{
                                    marginTop: "1.5rem",
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <h2
                                    style={{
                                        color: "#2563eb",
                                        fontSize: "1.8rem",
                                        fontWeight: "800",
                                    }}
                                >
                                    ₹
                                    {Math.round(
                                        product.price * 83
                                    )}
                                </h2>

                                <span
                                    style={{
                                        background: "#dbeafe",
                                        color: "#1d4ed8",
                                        padding:
                                            "0.4rem 0.8rem",
                                        borderRadius: "999px",
                                        fontWeight: "600",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Stock: {product.stock}
                                </span>
                            </div>

                            <button
                                onClick={async () => {
                                    try {
                                        const token =
                                            localStorage.getItem(
                                                "token"
                                            );

                                        await axios.post(
                                            "http://localhost:5000/cart/add",
                                            {
                                                productId:
                                                    product.id,
                                                quantity: 1,
                                            },
                                            {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            }
                                        );

                                        setCartCount(
                                            cartCount + 1
                                        );

                                        alert(
                                            "Product added to cart"
                                        );
                                    } catch (error) {
                                        alert(
                                            error.response?.data
                                                ?.message ||
                                            "Failed to add to cart"
                                        );
                                    }
                                }}
                                style={{
                                    marginTop: "auto",
                                    padding: "1rem",
                                    background:
                                        "linear-gradient(90deg, #2563eb, #1d4ed8)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "14px",
                                    fontWeight: "700",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    boxShadow:
                                        "0 6px 20px rgba(37,99,235,0.3)",
                                }}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;