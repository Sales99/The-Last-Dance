import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './Logar.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';

const firebaseConfig = {
    apiKey: "AIzaSyDYdvgk_Z3pYP-Lt_xpSwsvRyNghsSlS-4",
    authDomain: "teste-tcc-f1317.firebaseapp.com",
    projectId: "teste-tcc-f1317",
    storageBucket: "teste-tcc-f1317.appspot.com",
    messagingSenderId: "174564069294",
    appId: "1:174564069294:web:045933f5e77bc0fd0a423f"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

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
                navigate("/HomePage");
            }
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const userCollectionRef = collection(db, 'users');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const q = query(userCollectionRef, where("email", "==", email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                await signInWithEmailAndPassword(auth, email, senha);
                navigate("/HomePage");
            } else {
                setLatestError("Usuário não encontrado. Por favor, verifique suas credenciais.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setLatestError("Erro ao fazer login. Por favor, tente novamente mais tarde.");
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
            navigate("/Home"); // Redireciona após o login
        } catch (error) {
            console.error(error.message);
            setLatestError("Erro ao fazer login com o Google. Por favor, tente novamente mais tarde.");
        }
    };

    const [resetPasswordMessage, setResetPasswordMessage] = useState('');
    const [resetPasswordError, setResetPasswordError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!email) {
            setLatestError('Por favor, insira um endereço de e-mail.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            setResetPasswordMessage('Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.');
            setResetPasswordError('');
        } catch (error) {
            setResetPasswordError('Ocorreu um erro ao enviar o e-mail de redefinição de senha. Por favor, tente novamente.');
            setResetPasswordMessage('');
        }
    };

    return (
        <div className="login-page">
            <div className="Login_Container_Central">
                <div className="Login_container">
                    <div className="Login_Esquerda">
                    </div>
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
                            {resetPasswordMessage && <Alert variant="info" className="Aviso_de_info">{resetPasswordMessage}</Alert>}
                            {resetPasswordError && <Alert variant="danger" className="Aviso_de_erro">{resetPasswordError}</Alert>}
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
