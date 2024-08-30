import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Image from '../../images/Mulher_Abrindo_Porta_Prime.png'
import './Cadastro.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


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
            // Se o login for bem-sucedido, você pode redirecionar o usuário para a página de login ou para onde desejar
            navigate("/LogarPage");
        } catch (error) {
            setLatestError("Erro ao fazer login com Google. Por favor, tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    };
    
    const handleCadastro = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
          setLatestError("As senhas não coincidem.");
            return;
        }

        setLoading(true);
    
        try {
          // Verificar se o e-mail já existe
          const signInMethods = await fetchSignInMethodsForEmail(auth, email);
          if (signInMethods.length > 0) {
              // E-mail já está em uso, exibir mensagem de erro
              setLatestError("Este e-mail já está em uso. Por favor, use outro e-mail.");
              setLoading(false);
              return;
          }
          
          // Se o e-mail não existir, criar a conta
          const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
          // Se o cadastro for bem-sucedido, você pode redirecionar o usuário para a página de login ou para onde desejar
          navigate("/LogarPage");
      } catch (error) {
          console.error("Erro ao fazer cadastro:", error.message);
          setLatestError("Erro ao fazer cadastro. Por favor, tente novamente mais tarde.");
      } finally {
          setLoading(false);
      }
  };
    
    return (
        <>
            <br /><br /><br /><br />
            <div className="Cadastro_container">
                <div className="Cadastro_Esquerda">
                    <img src={Image} className="Imagem_Cadastro" alt="Image_Login"></img>
                </div>
                <div className="Cadastro_Direita">
                    <div className="Cadastro_TItulo">
                        <h1>Cadastro</h1>
                    </div>
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
                                ></input>
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
                        <br />
                        {/* Exibição da mensagem de erro após tentativa de cadastro */}
                        {latestError && <Alert variant="danger" className="Aviso_de_erro_cadastro">{latestError}</Alert>}
                        <div className="Entrar-se">
                        <p className="Txt_Login">Já tem uma conta?<Link to="../LogarPage" className="Btn_Login">Login</Link></p>
                    </div>
                    <div className="Login_Google">
                        <p>Logar também com:</p>
                        <div className="Fundo_Google">
                            <a href="#" onClick={handleGoogleSignIn}><i className="bi bi-google"></i></a>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Cadastro;
