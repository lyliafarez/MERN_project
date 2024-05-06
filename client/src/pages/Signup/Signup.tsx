import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs"; 
import showSweetAlert from "../../helpers/showSweetAlert";

export default function Signup() {

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(""); 
    const navigate = useNavigate()



    const handleRegister = async (e) => {
        e.preventDefault();
        try {

            const verifUser = await axios.get(`http://localhost:8080/users`);
            const users = verifUser.data.users;

            // Vérificatipon de l'email : si déja existant  dans la base
            const user = users.find(user => user.email === email);
           
            if (user) {
                // Si l'e-mail existe déjà, afficher un message d'erreur et bloquer la création du compte   
                setError("This e-mail is associated to an existing user, please change it !");
                setName("");
                setLastname("");
                setAge("");
                setPassword("");
                setEmail("");
            }else{

            const hashedPassword = await bcrypt.hash(password, 10);
            // Si l'e-mail n'existe pas déjà, créer le compte
            const response = await axios.post('http://localhost:8080/users', {
                    name,
                    lastname,
                    email,
                    age,
                    password: hashedPassword
            });
            console.log(response.data);
            navigate('/Login');
            showSweetAlert("success", "User created successfully !", "success", "Done");
        }
        } catch (error) {
            console.log(name,lastname,email,age,password)
            setError("Error when creating the user");
            console.error("Erreur lors de la création de l'utilisateur : ", error);
            setName("");
            setLastname("");
            setAge("");
            setPassword("");
            setEmail("");
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4 text-center">Sign Up</h2>
                            {error && <div className="alert alert-danger">{error}</div>} {/* Afficher le message d'erreur */}
                            <form onSubmit={handleRegister}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        <strong>Firstname</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Dupont"
                                        autoComplete="off"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="lastname" className="form-label">
                                        <strong>Lastname</strong>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Marc"
                                        autoComplete="off"
                                        name="lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

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
                                    <label htmlFor="age" className="form-label">
                                        <strong>Age</strong>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="23"
                                        autoComplete="off"
                                        name="age"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="form-control"
                                        min="0"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        <strong>Password</strong>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter password"
                                        autoComplete="off"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                    />
                                    <button
                                        className="btn btn-outline-secondary my-2"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)} // Inversion de l'état de showPassword lors du clic sur le bouton
                                    >
                                        {showPassword ? "Hide" : "Show"} {}
                                    </button>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">Register</button>
                                </div>
                            </form>
                            <div className="text-center mt-3">
                                <p>Already have an account? <strong><Link to="../Login" className="btn btn-link p-0">Login</Link></strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
