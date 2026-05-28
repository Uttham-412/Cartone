import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav
            style={{
                background: "#111827",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <h2 style={{ color: "white" }}>🛒 CART One</h2>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Link
                    to="/"
                    style={{
                        color: "white",
                        textDecoration: "none",
                    }}
                >
                    Home
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
                                color: "white",
                                textDecoration: "none",
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
                            }}
                        >
                            Cart
                        </Link>

                        <span style={{ color: "white" }}>
                            Hi, {user.username}
                        </span>

                        <button
                            onClick={logout}
                            style={{
                                background: "#ef4444",
                                border: "none",
                                padding: "0.5rem 1rem",
                                color: "white",
                                borderRadius: "6px",
                                cursor: "pointer",
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