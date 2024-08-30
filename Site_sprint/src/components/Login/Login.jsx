import React, { useState } from 'react'
import './Login.css'
const Login = () => {

    const[user, setUser] = useState(
        {
            Name:'', email:'', subject: '', Message: ''
        }
    )
    let values, names
    const data = (e) => 
    {
        values = e.target.value
        names = e.target.name
        setUser({...user, [names]: values})
    }

    const send = async (e) => 
    {
        const {Name, email, subject, Message} = user
        e.preventDefault()
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'aplication/json'
            },
            body: JSON.stringify({
                Name, email, subject, Message
            })
        }

        const send = await fetch(
            'https://sprint-teste-1-default-rtdb.firebaseio.com/Message.json', option
            )

        if (send) {
            alert("Mensagem enviada com sucesso!")
        }
        else
        {
            alert("Erro. Mensagem não enviada.")
        }

    }

  return (
    <>
    <div className='contact'>
        <div className='container'>
            <div className='form'>
            <form method='POST'>
                <h2>Contato</h2>
                
                    <div className='box'>
                        <div className='lable'>
                            <h4>Nome</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Nome' value={user.Name} name='Name' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>E-mail</h4>
                        </div>
                        <div className='input'>
                            <input type='email' placeholder='E-mail' value={user.email} name='email' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Assunto</h4>
                        </div>
                        <div className='input'>
                            <input type='text' placeholder='Assunto' value={user.subject} name='subject' onChange={data}></input>
                        </div>
                    </div>
                    <div className='box'>
                        <div className='lable'>
                            <h4>Mensagem</h4>
                        </div>
                        <div className='input'>
                            <textarea placeholder='Mensagem' value={user.Message} name='Message' onChange={data}></textarea>
                        </div>
                    </div>
                    <button type='sublit' onClick={send}>Enviar</button>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login