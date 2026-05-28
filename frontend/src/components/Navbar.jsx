import { Link } from "react-router-dom";
import { useContext } from "react";

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
                background: "#111827",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent:
                    "space-between",
                alignItems: "center",
                position: "sticky",
                top: 0,
                zIndex: 1000,
                boxShadow:
                    "0 2px 10px rgba(0,0,0,0.2)",
            }}
        >
            <h2 style={{ color: "white" }}>
                🛒 CART One
            </h2>

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
                        textDecoration:
                            "none",
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
                                textDecoration:
                                    "none",
                            }}
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            style={{
                                color: "white",
                                textDecoration:
                                    "none",
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
                                textDecoration:
                                    "none",
                            }}
                        >
                            Cart (
                            {cartCount})
                        </Link>

                        <span
                            style={{
                                color: "white",
                            }}
                        >
                            Hi,{" "}
                            {
                                user.username
                            }
                        </span>

                        <button
                            onClick={
                                logout
                            }
                            style={{
                                background:
                                    "#ef4444",
                                border:
                                    "none",
                                padding:
                                    "0.5rem 1rem",
                                color:
                                    "white",
                                borderRadius:
                                    "6px",
                                cursor:
                                    "pointer",
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