import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import { AuthContext } from "../context/AuthContext";

function Register() {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        try {
            const response = await axios.post(
                "http://localhost:5000/register",
                formData
            );

            const { token, user } = response.data;

            localStorage.setItem("token", token);

            login(user);

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1>Register</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    maxWidth: "400px",
                    marginTop: "1rem",
                }}
            >
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{
                        padding: "0.75rem",
                    }}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{
                        padding: "0.75rem",
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                        padding: "0.75rem",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        padding: "0.75rem",
                        background: "#111827",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Register
                </button>

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Register;