import {
    useEffect,
    useState,
    useContext,
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import { CartContext } from "../context/CartContext";

function Products() {
    const navigate = useNavigate();

    const {
        cartCount,
        setCartCount,
    } = useContext(CartContext);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [searchTerm, setSearchTerm] =
        useState("");

    const [sortOption, setSortOption] =
        useState("default");

    useEffect(() => {
        const fetchProducts =
            async () => {
                try {
                    const response =
                        await axios.get(
                            "http://localhost:5000/products"
                        );

                    setProducts(
                        response.data
                    );
                } catch (error) {
                    alert(
                        "Unable to load products."
                    );
                } finally {
                    setLoading(false);
                }
            };

        fetchProducts();
    }, []);

    const handleAddToCart = async (
        productId
    ) => {
        const token =
            localStorage.getItem("token");

        if (!token) {
            alert(
                "Please login to add items to your cart."
            );

            navigate("/login");

            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/cart/add",
                {
                    productId,
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(
                "Product added to cart successfully."
            );

            const updatedCount =
                cartCount + 1;

            setCartCount(
                updatedCount
            );

            localStorage.setItem(
                "cartCount",
                updatedCount
            );
        } catch (error) {
            if (
                error.response?.status ===
                401
            ) {
                localStorage.removeItem(
                    "token"
                );

                alert(
                    "Session expired. Please login again."
                );

                navigate("/login");
            } else {
                alert(
                    error.response?.data
                        ?.message ||
                    "Unable to add product to cart."
                );
            }
        }
    };

    let filteredProducts = [
        ...products,
    ];

    filteredProducts =
        filteredProducts.filter(
            (product) =>
                product.name
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    )
        );

    if (
        sortOption === "lowToHigh"
    ) {
        filteredProducts.sort(
            (a, b) =>
                a.price - b.price
        );
    }

    if (
        sortOption === "highToLow"
    ) {
        filteredProducts.sort(
            (a, b) =>
                b.price - a.price
        );
    }

    if (loading) {
        return (
            <div
                style={{
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <h2>
                    Loading products...
                </h2>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "1.5rem",
            }}
        >
            <div
                style={{
                    background:
                        "linear-gradient(135deg, #2563eb, #1d4ed8)",
                    padding: "4rem 2rem",
                    borderRadius: "30px",
                    color: "white",
                    textAlign: "center",
                    marginBottom: "3rem",
                    boxShadow:
                        "0 15px 40px rgba(37,99,235,0.25)",
                }}
            >
                <h1
                    style={{
                        fontSize: "4rem",
                        fontWeight: "800",
                    }}
                >
                    Welcome to CART One
                </h1>

                <p
                    style={{
                        marginTop: "1rem",
                        fontSize: "1.3rem",
                        opacity: 0.9,
                    }}
                >
                    Modern shopping experience with premium products
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent:
                        "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "2rem",
                    flexWrap: "wrap",
                }}
            >
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(
                            event.target.value
                        )
                    }
                    style={{
                        flex: 1,
                        minWidth: "250px",
                        padding: "1rem",
                        borderRadius: "14px",
                        border:
                            "1px solid #d1d5db",
                        fontSize: "1rem",
                        outline: "none",
                        boxShadow:
                            "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                />

                <select
                    value={sortOption}
                    onChange={(event) =>
                        setSortOption(
                            event.target.value
                        )
                    }
                    style={{
                        padding: "1rem",
                        borderRadius: "14px",
                        border:
                            "1px solid #d1d5db",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow:
                            "0 4px 15px rgba(0,0,0,0.05)",
                    }}
                >
                    <option value="default">
                        Default Sorting
                    </option>

                    <option value="lowToHigh">
                        Price: Low to High
                    </option>

                    <option value="highToLow">
                        Price: High to Low
                    </option>
                </select>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "2rem",
                }}
            >
                {filteredProducts.map(
                    (product) => (
                        <div
                            key={product.id}
                            style={{
                                background:
                                    "white",
                                borderRadius:
                                    "24px",
                                overflow:
                                    "hidden",
                                boxShadow:
                                    "0 10px 30px rgba(0,0,0,0.08)",
                                transition:
                                    "transform 0.3s ease",

                                display: "flex",
                                flexDirection:
                                    "column",
                                minHeight:
                                    "620px",
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit:
                                        "cover",
                                }}
                            />

                            <div
                                style={{
                                    padding:
                                        "1.5rem",

                                    display: "flex",
                                    flexDirection:
                                        "column",
                                    flex: 1,
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize:
                                            "2rem",
                                        fontWeight:
                                            "700",
                                        color:
                                            "#111827",
                                    }}
                                >
                                    {product.name}
                                </h2>

                                <p
                                    style={{
                                        marginTop:
                                            "1rem",
                                        color:
                                            "#6b7280",
                                        lineHeight:
                                            "1.7",
                                    }}
                                >
                                    {
                                        product.description
                                    }
                                </p>

                                <div
                                    style={{
                                        marginTop:
                                            "1.5rem",
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "center",
                                    }}
                                >
                                    <h3
                                        style={{
                                            color:
                                                "#2563eb",
                                            fontSize:
                                                "2rem",
                                            fontWeight:
                                                "800",
                                        }}
                                    >
                                        ₹
                                        {Math.round(
                                            product.price *
                                            83
                                        )}
                                    </h3>

                                    <span
                                        style={{
                                            background:
                                                "#dbeafe",
                                            color:
                                                "#1d4ed8",
                                            padding:
                                                "0.4rem 0.8rem",
                                            borderRadius:
                                                "999px",
                                            fontWeight:
                                                "600",
                                            fontSize:
                                                "0.9rem",
                                        }}
                                    >
                                        Stock:{" "}
                                        {
                                            product.stock
                                        }
                                    </span>
                                </div>

                                <div
                                    style={{
                                        marginTop:
                                            "auto",
                                    }}
                                />

                                <button
                                    onClick={() =>
                                        handleAddToCart(
                                            product.id
                                        )
                                    }
                                    style={{
                                        width: "100%",
                                        marginTop:
                                            "1.5rem",
                                        padding:
                                            "1rem",
                                        border:
                                            "none",
                                        borderRadius:
                                            "14px",
                                        background:
                                            "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                        color:
                                            "white",
                                        fontWeight:
                                            "700",
                                        fontSize:
                                            "1rem",
                                        cursor:
                                            "pointer",
                                        boxShadow:
                                            "0 6px 20px rgba(37,99,235,0.25)",
                                    }}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Products;