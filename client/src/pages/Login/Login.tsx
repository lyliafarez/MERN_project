import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import bcrypt from "bcryptjs";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/users`);
            const users = response.data.users;

            const LoggedUser = users.find(user => user.email === email);

            /*if (user) {
                const hashedPassword = await hashPassword(password);

                if (hashedPassword === user.password) {
                    console.log("Utilisateur connecté :", user);*/
            const isMatch = await bcrypt.compare(password, LoggedUser.password);
            const user = users.find(user => user.email === email && isMatch);
            if (user) {
                console.log("Utilisateur connecté :", user);

                   // Enregistrement de l'état de connexion dans le localStorage
                localStorage.setItem("isLoggedIn", true);

                // Enregistrement les informations de l'utilisateur dans le localStorage
                localStorage.setItem("user", JSON.stringify(user));
                navigate('/events');
            } else {
                setError("Incorrect credentials !"); 
                setPassword("");
                setEmail("");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion: ", error);
        }
    };

    return (
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center">Connexion</h2>
                            {error && <div className="alert alert-danger">{error}</div>} 
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        <strong>Email</strong>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="marcdupont@gmail.com"
                                        autoComplete="off"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <strong>Mot de passe</strong>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="Enter mot a password"
                                            autoComplete="off"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)} 
                                        >
                                            {showPassword ? "Hide" : "Show"} 
                                        </button>
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <p>don't have an account? <strong><Link to="/register" className="btn btn-link p-0">Register</Link></strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

