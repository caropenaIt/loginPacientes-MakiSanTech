import { useState, useEffect } from 'react'
import background from './assets/background.svg';
import redes from './assets/redes.svg';
import copyright from './assets/copyright.svg';
import soporte from './assets/soporte.svg';
import './Login.css'


const Login = ({ onAddSesion }) => {
  //const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [errors, setErrors] = useState([]); 
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 

  
  const validatePassword = (pwd) => {
    const newErrors = [];

    if (pwd.length < 8 || !/[a-z]/.test(pwd)|| !/[A-Z]/.test(pwd)||!/[0-9]/.test(pwd)) {
      newErrors.push('Debe contener al menos 8 caracteres, una letra minúscula, una letra mayúscula y un número.');
    };


    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSesion = (event) => {
    event.preventDefault(); 
    setIsFormSubmitted(true); 

    const isValidPassword = validatePassword(contraseña);

    if (!isValidPassword) {

      return;
    }

    
    alert(`Sesión iniciada correctamente. ¡Bienvenido, ${email}!`);

    const newSesion = {
      id: Date.now(),
      //nombre,
      email,
      contraseña
    };
    onAddSesion(newSesion); 
    //setNombre('');
    setEmail('');
    setContraseña('');
    setErrors([]);
    setIsFormSubmitted(false); 
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setContraseña(newPassword);

    if (isFormSubmitted) {
      validatePassword(newPassword);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  return (
    <>
      <main className='loginContainer'>
        <img src={background} alt="dentista" />
        <form className='form' onSubmit={handleSesion}>
          <h2>iniciar Sesión</h2>
          <label htmlFor="email">Email</label>
          <input
          className='input'
            type="email"
            placeholder='Email'
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label htmlFor="contraseña">Contraseña</label>
          <input
          className='input'
            type="password"
            placeholder='Ingresa tu contraseña'
            id="contraseña"
            value={contraseña}
            onChange={handlePasswordChange}
            required
          />

          {(isFormSubmitted || errors.length > 0) && errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index} className="error-message">{error}</p>
              ))}
            </div>
          )}

          <button type='submit' className='submit'>Continuar</button>
          <p>¿Olvidaste tu contraseña? <a href="#">Recuperá tu contraseña</a></p>
        </form>
        
      </main>
      <img src={soporte} alt="soporte-logo" className='soporteLogo'/>
      <footer>
        <img src={redes} alt="redes-sociales" className='redes' />
        <img src={copyright} alt="copyright" className='copyright' />
      </footer>
    </>
  );
};

export default Login;
