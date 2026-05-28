import { Link } from "react-router-dom";
import { useContext } from "react";

import { FaShoppingCart } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
    const { user, logout } =
        useContext(AuthContext);

    const { cartCount } =
        useContext(CartContext);

    return (
        <nav
            style={{
                background:
                    "linear-gradient(90deg, #111827, #1f2937)",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                boxShadow:
                    "0 4px 20px rgba(0,0,0,0.15)",
            }}
        >
            <Link
                to="/"
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    textDecoration: "none",
                }}
            >
                <div
                    style={{
                        background: "#2563eb",
                        padding: "0.7rem",
                        borderRadius: "12px",
                        color: "white",
                    }}
                >
                    <FaShoppingCart size={20} />
                </div>

                <div>
                    <h2
                        style={{
                            color: "white",
                            fontWeight: "700",
                        }}
                    >
                        CART One
                    </h2>

                    <p
                        style={{
                            color: "#9ca3af",
                            fontSize: "0.8rem",
                        }}
                    >
                        Smart Shopping
                    </p>
                </div>
            </Link>

            <div
                style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                    }}
                >
                    Products
                </Link>

                {!user ? (
                    <>
                        <Link
                            to="/login"
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            style={{
                                background: "#2563eb",
                                color: "white",
                                padding: "0.6rem 1.2rem",
                                borderRadius: "8px",
                                textDecoration: "none",
                                fontWeight: "600",
                            }}
                        >
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/cart"
                            style={{
                                color: "white",
                                textDecoration: "none",
                                fontWeight: "600",
                            }}
                        >
                            Cart ({cartCount})
                        </Link>

                        <span
                            style={{
                                color: "#d1d5db",
                            }}
                        >
                            Hi, {user.username}
                        </span>

                        <button
                            onClick={logout}
                            style={{
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "0.6rem 1rem",
                                borderRadius: "8px",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;