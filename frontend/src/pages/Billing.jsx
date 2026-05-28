import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Billing() {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        cardNumber: "",
    });

    useEffect(() => {
        const storedCart =
            localStorage.getItem("cartItems");

        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleCheckout = () => {
        if (
            !formData.fullName ||
            !formData.address ||
            !formData.cardNumber
        ) {
            alert("Please fill all fields");
            return;
        }

        alert("Order placed successfully!");

        localStorage.removeItem("cartItems");

        navigate("/");
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Billing & Checkout</h1>

            <div
                style={{
                    marginTop: "2rem",
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
            >
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ padding: "0.75rem" }}
                />

                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{ padding: "0.75rem" }}
                />

                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    style={{ padding: "0.75rem" }}
                />

                <h2>Total: ${totalPrice.toFixed(2)}</h2>

                <button
                    onClick={handleCheckout}
                    style={{
                        padding: "0.75rem",
                        background: "#111827",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default Billing;