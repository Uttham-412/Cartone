import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Cart() {
    const navigate = useNavigate();

    const [cartItems, setCartItems] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token =
                    localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/cart",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCartItems(response.data);
            } catch (error) {
                setError(
                    "Unable to load cart items."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total +
            item.price * item.quantity,
        0
    );

    if (loading) {
        return (
            <div
                style={{
                    padding: "3rem",
                    textAlign: "center",
                }}
            >
                <h2>Loading cart...</h2>
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
                    marginBottom: "3rem",
                }}
            >
                <h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: "800",
                        color: "#111827",
                    }}
                >
                    Your Shopping Cart
                </h1>

                <p
                    style={{
                        marginTop: "0.5rem",
                        color: "#6b7280",
                        fontSize: "1rem",
                    }}
                >
                    Review your selected items
                </p>
            </div>

            {cartItems.length === 0 ? (
                <div
                    style={{
                        background: "white",
                        padding: "3rem",
                        borderRadius: "20px",
                        textAlign: "center",
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    <h2>Your cart is currently empty.</h2>
                </div>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                        }}
                    >
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    background: "white",
                                    borderRadius: "20px",
                                    padding: "1.5rem",
                                    display: "flex",
                                    gap: "1.5rem",
                                    alignItems: "center",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.08)",
                                    flexWrap: "wrap",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "140px",
                                        height: "140px",
                                        objectFit: "cover",
                                        borderRadius: "16px",
                                    }}
                                />

                                <div
                                    style={{
                                        flex: 1,
                                        minWidth: "250px",
                                    }}
                                >
                                    <h2
                                        style={{
                                            fontSize: "1.5rem",
                                            fontWeight: "700",
                                        }}
                                    >
                                        {item.name}
                                    </h2>

                                    <p
                                        style={{
                                            marginTop: "0.75rem",
                                            color: "#6b7280",
                                        }}
                                    >
                                        Price: ₹
                                        {Math.round(
                                            item.price * 83
                                        )}
                                    </p>

                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            marginTop: "1.5rem",
                                            flexWrap: "wrap",
                                        }}
                                    >
                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token =
                                                        localStorage.getItem(
                                                            "token"
                                                        );

                                                    await axios.patch(
                                                        "http://localhost:5000/cart/update",
                                                        {
                                                            productId:
                                                                item.id,
                                                            quantity:
                                                                item.quantity -
                                                                1,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    setCartItems(
                                                        (prev) =>
                                                            prev
                                                                .map(
                                                                    (
                                                                        cartItem
                                                                    ) =>
                                                                        cartItem.id ===
                                                                            item.id
                                                                            ? {
                                                                                ...cartItem,
                                                                                quantity:
                                                                                    cartItem.quantity -
                                                                                    1,
                                                                            }
                                                                            : cartItem
                                                                )
                                                                .filter(
                                                                    (
                                                                        cartItem
                                                                    ) =>
                                                                        cartItem.quantity >
                                                                        0
                                                                )
                                                    );
                                                } catch (error) {
                                                    alert(
                                                        "Unable to update cart quantity."
                                                    );
                                                }
                                            }}
                                            style={{
                                                background:
                                                    "#e5e7eb",
                                                border: "none",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius:
                                                    "10px",
                                                cursor: "pointer",
                                                fontSize: "1.2rem",
                                                fontWeight: "700",
                                            }}
                                        >
                                            -
                                        </button>

                                        <span
                                            style={{
                                                fontSize: "1.2rem",
                                                fontWeight: "700",
                                            }}
                                        >
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token =
                                                        localStorage.getItem(
                                                            "token"
                                                        );

                                                    await axios.patch(
                                                        "http://localhost:5000/cart/update",
                                                        {
                                                            productId:
                                                                item.id,
                                                            quantity:
                                                                item.quantity +
                                                                1,
                                                        },
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    setCartItems(
                                                        (prev) =>
                                                            prev.map(
                                                                (
                                                                    cartItem
                                                                ) =>
                                                                    cartItem.id ===
                                                                        item.id
                                                                        ? {
                                                                            ...cartItem,
                                                                            quantity:
                                                                                cartItem.quantity +
                                                                                1,
                                                                        }
                                                                        : cartItem
                                                            )
                                                    );
                                                } catch (error) {
                                                    alert(
                                                        "Unable to update cart quantity."
                                                    );
                                                }
                                            }}
                                            style={{
                                                background:
                                                    "#2563eb",
                                                color: "white",
                                                border: "none",
                                                width: "40px",
                                                height: "40px",
                                                borderRadius:
                                                    "10px",
                                                cursor: "pointer",
                                                fontSize: "1.2rem",
                                                fontWeight: "700",
                                            }}
                                        >
                                            +
                                        </button>

                                        <button
                                            onClick={async () => {
                                                try {
                                                    const token =
                                                        localStorage.getItem(
                                                            "token"
                                                        );

                                                    await axios.delete(
                                                        `http://localhost:5000/cart/remove/${item.id}`,
                                                        {
                                                            headers: {
                                                                Authorization: `Bearer ${token}`,
                                                            },
                                                        }
                                                    );

                                                    setCartItems(
                                                        (prev) =>
                                                            prev.filter(
                                                                (
                                                                    cartItem
                                                                ) =>
                                                                    cartItem.id !==
                                                                    item.id
                                                            )
                                                    );
                                                } catch (error) {
                                                    alert(
                                                        "Unable to remove item from cart."
                                                    );
                                                }
                                            }}
                                            style={{
                                                marginLeft: "auto",
                                                background:
                                                    "#ef4444",
                                                color: "white",
                                                border: "none",
                                                padding:
                                                    "0.8rem 1.2rem",
                                                borderRadius:
                                                    "10px",
                                                cursor: "pointer",
                                                fontWeight: "600",
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <h3
                                        style={{
                                            marginTop: "1.5rem",
                                            color: "#111827",
                                        }}
                                    >
                                        Subtotal: ₹
                                        {Math.round(
                                            item.price *
                                            item.quantity *
                                            83
                                        )}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            marginTop: "3rem",
                            background: "white",
                            padding: "2rem",
                            borderRadius: "20px",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.08)",
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "1rem",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "2rem",
                                color: "#111827",
                            }}
                        >
                            Total: ₹
                            {Math.round(
                                totalPrice * 83
                            )}
                        </h2>

                        <button
                            onClick={() => {
                                localStorage.setItem(
                                    "cartItems",
                                    JSON.stringify(
                                        cartItems
                                    )
                                );

                                navigate("/billing");
                            }}
                            style={{
                                padding:
                                    "1rem 2rem",
                                background:
                                    "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                color: "white",
                                border: "none",
                                borderRadius: "14px",
                                cursor: "pointer",
                                fontWeight: "700",
                                fontSize: "1rem",
                                boxShadow:
                                    "0 6px 20px rgba(37,99,235,0.3)",
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;