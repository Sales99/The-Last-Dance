// LogarPage.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Logar.css';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

const firebaseConfig = {
    apiKey: "AIzaSyColq8nh741FW-DeAVRdc77ZcC9FP-Blp8",
    authDomain: "teste-denovo-1d43c.firebaseapp.com",
    projectId: "teste-denovo-1d43c",
    storageBucket: "teste-denovo-1d43c.appspot.com",
    messagingSenderId: "384646857934",
    appId: "1:384646857934:web:70f54a0c677d602d03fc9f",
    measurementId: "G-E9FET4BYVZ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export function LogarPage() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [latestError, setLatestError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate("/perfil"); // Redireciona para a página de perfil
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, senha);
            navigate("/perfil"); // Redireciona após o login
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setLatestError("Usuário não encontrado ou senha incorreta. Por favor, verifique suas credenciais.");
        } finally {
            setLoading(false);
        }
    };

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Usuário autenticado com sucesso:", user);
            navigate("/perfil"); // Redireciona após o login
        } catch (error) {
            console.error(error.message);
            setLatestError("Erro ao fazer login com o Google. Por favor, tente novamente mais tarde.");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setLatestError('Por favor, insira um endereço de e-mail.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setLatestError('Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.');
        } catch (error) {
            setLatestError('Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente.');
        }
    };

    return (
        <div className="login-page">
            <div className="Login_Container_Central">
                <div className="Login_container">
                    <div className="Login_Direita">
                        <div className="Login_Titulo">
                            <h1>LOGIN</h1>
                        </div>
                        <form onSubmit={handleLogin} className="Formulario_Login">
                            <div className="Inputs">
                                <div className="Inputs_email">
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
                                <div className="Inputs_senha">
                                    <label>Senha</label>
                                    <div className="Input_senha_container">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="Input_Inserir"
                                            id="Input_Senha"
                                            required
                                            placeholder="Insira sua senha"
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                        />
                                        <div className="olho-icon" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="Opcoes_adicionais">
                                <div className="LembrarDeMim">
                                    <input type="checkbox" />
                                    <label>Lembrar de mim</label>
                                </div>
                                <a className="Btn_EsqueceuSenha" onClick={handleResetPassword}>Esqueceu a senha?</a>
                            </div>
                            <div className="EnviarFormulario">
                                {loading ? (
                                    <Spinner animation="border" variant="primary" className="Spinner" />
                                ) : (
                                    <button type="submit" className="Btn_EnviarFormulario">Enviar</button>
                                )}
                            </div>
                            {latestError && <Alert variant="danger" className="Aviso_de_erro">{latestError}</Alert>}
                            <div className="Cadastre-se">
                                <p className="Txt_Cadastro">Não tem uma conta?<Link to="../Cadastro" className="Btn_Cadastro">Cadastre-se</Link></p>
                            </div>
                            <div className="Login_Google">
                                <p>Logar também com:</p>
                                <button className="Btn_EntrarGoogle" onClick={signInWithGoogle}>
                                    <FaGoogle size={24} />
                                    Entrar com Google
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogarPage;
