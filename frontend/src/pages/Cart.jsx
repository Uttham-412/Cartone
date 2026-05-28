import { useEffect, useState } from "react";

import axios from "axios";

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true);

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
                setError("Failed to fetch cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    if (loading) {
        return (
            <div style={{ padding: "2rem" }}>
                <h2>Loading cart...</h2>
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
            <h1>Your Cart</h1>

            {cartItems.length === 0 ? (
                <h3 style={{ marginTop: "1rem" }}>
                    Cart is empty
                </h3>
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            marginTop: "2rem",
                        }}
                    >
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    gap: "1rem",
                                    background: "white",
                                    padding: "1rem",
                                    borderRadius: "10px",
                                    boxShadow:
                                        "0 2px 10px rgba(0,0,0,0.1)",
                                }}
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                        width: "120px",
                                        height: "120px",
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                    }}
                                />

                                <div>
                                    <h2>{item.name}</h2>

                                    <p
                                        style={{
                                            marginTop: "0.5rem",
                                        }}
                                    >
                                        Quantity: {item.quantity}
                                    </p>

                                    <p
                                        style={{
                                            marginTop: "0.5rem",
                                        }}
                                    >
                                        Price: ${item.price}
                                    </p>

                                    <h3
                                        style={{
                                            marginTop: "1rem",
                                        }}
                                    >
                                        Subtotal: $
                                        {(
                                            item.price * item.quantity
                                        ).toFixed(2)}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h2 style={{ marginTop: "2rem" }}>
                        Total: ${totalPrice.toFixed(2)}
                    </h2>
                </>
            )}
        </div>
    );
}

export default Cart;