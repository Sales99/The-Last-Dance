import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Cadastro.css';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const firebaseConfig = {
    apiKey: "AIzaSyDYdvgk_Z3pYP-Lt_xpSwsvRyNghsSlS-4",
    authDomain: "teste-tcc-f1317.firebaseapp.com",
    projectId: "teste-tcc-f1317",
    storageBucket: "teste-tcc-f1317.appspot.com",
    messagingSenderId: "174564069294",
    appId: "1:174564069294:web:045933f5e77bc0fd0a423f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function Cadastro() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [latestError, setLatestError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const googleProvider = new GoogleAuthProvider();

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            navigate("/login");
        } catch (error) {
            setLatestError("Erro ao fazer login com Google. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    const handleCadastro = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            setLatestError("As senhas não estão iguais..");
            return;
        }

        setLoading(true);

        try {
            const signInMethods = await fetchSignInMethodsForEmail(auth, email);
            if (signInMethods.length > 0) {
                setLatestError("Este e-mail já está em uso. Por favor, use outro e-mail.");
                setLoading(false);
                return;
            }

            await createUserWithEmailAndPassword(auth, email, senha);
            navigate("/login");
        } catch (error) {
            setLatestError("Erro ao fazer cadastro. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="CadastroWrapper">
            <div className="CadastroQuadrado">
                <h1 className="Cadastro_Titulo">Cadastro</h1>
                <form onSubmit={handleCadastro} className="Formulario_Cadastro">
                    <div className="Inputs_Cadastro">
                        <div className="Inputs_email_cadastro">
                            <label>Email</label>
                            <input
                                type="email"
                                className="Input_Inserir"
                                id="Input_Email"
                                placeholder="@gmail.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="Inputs_senha_cadastrar">
                            <label>Senha</label>
                            <div className="Input_senha_container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="Input_Inserir"
                                    id="Input_Senha"
                                    placeholder="Insira sua senha"
                                    required
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                                <div className="olho-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        <div className="Inputs_senha_cadastrar">
                            <label>Confirmar Senha</label>
                            <div className="Input_senha_container">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="Input_Inserir"
                                    id="Input_ConfirmarSenha"
                                    placeholder="Confirme sua senha"
                                    required
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                                <div className="olho-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="EnviarFormularioCadastro">
                        {loading ? (
                            <Spinner animation="border" variant="primary" className="Spinner" />
                        ) : (
                            <button type="submit" className="Btn_EnviarFormulario_cadastro">Cadastrar</button>
                        )}
                    </div>
                    {latestError && <Alert variant="danger" className="Aviso_de_erro_cadastro">{latestError}</Alert>}
                    <div className="Entrar-se">
                        <p className="Txt_Login">Já tem uma conta?<Link to="/login" className="Btn_Login">Login</Link></p>
                    </div>
                    <div className="Login_Google">
                        <p>Cadastrar também com:</p>
                        <button type="button" onClick={handleGoogleSignIn} className="Btn_Google_SignIn">
                            <FaGoogle /> Cadastrar com Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;