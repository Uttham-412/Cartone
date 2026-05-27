import { Link } from "react-router-dom";

function Navbar() {
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

            <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                    to="/"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Home
                </Link>

                <Link
                    to="/login"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Login
                </Link>

                <Link
                    to="/register"
                    style={{ color: "white", textDecoration: "none" }}
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;