import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

import logo from "../assets/cartone-logo.png";

function Navbar() {
    const { user, logout } =
        useContext(AuthContext);

    const { cartCount } =
        useContext(CartContext);

    return (
        <nav
            style={{
                background:
                    "linear-gradient(90deg, #020617, #0f172a)",
                padding: "1rem 2.5rem",
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
                    textDecoration: "none",
                }}
            >
                <img
                    src={logo}
                    alt="CART One Logo"
                    style={{
                        height: "90px",
                        width: "auto",
                        objectFit: "contain",
                        filter:
                            "drop-shadow(0 0 10px rgba(37,99,235,0.4))",
                    }}
                />
            </Link>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                }}
            >
                <Link
                    to="/"
                    style={{
                        color: "#f8fafc",
                        textDecoration: "none",
                        fontWeight: "600",
                        fontSize: "1rem",
                    }}
                >
                    Products
                </Link>

                {!user ? (
                    <>
                        <Link
                            to="/login"
                            style={{
                                color: "#f8fafc",
                                textDecoration: "none",
                                fontWeight: "600",
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            style={{
                                background:
                                    "linear-gradient(135deg, #2563eb, #1d4ed8)",
                                color: "white",
                                padding: "0.8rem 1.4rem",
                                borderRadius: "12px",
                                textDecoration: "none",
                                fontWeight: "700",
                                boxShadow:
                                    "0 4px 15px rgba(37,99,235,0.3)",
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
                                background:
                                    "rgba(255,255,255,0.08)",
                                color: "white",
                                padding: "0.8rem 1.2rem",
                                borderRadius: "12px",
                                textDecoration: "none",
                                fontWeight: "700",
                                border:
                                    "1px solid rgba(255,255,255,0.08)",
                            }}
                        >
                            Cart ({cartCount})
                        </Link>

                        <span
                            style={{
                                color: "#d1d5db",
                                fontWeight: "500",
                            }}
                        >
                            Hi, {user.username}
                        </span>

                        <button
                            onClick={logout}
                            style={{
                                background:
                                    "linear-gradient(135deg, #ef4444, #dc2626)",
                                color: "white",
                                border: "none",
                                padding: "0.8rem 1.2rem",
                                borderRadius: "12px",
                                cursor: "pointer",
                                fontWeight: "700",
                                boxShadow:
                                    "0 4px 15px rgba(239,68,68,0.3)",
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