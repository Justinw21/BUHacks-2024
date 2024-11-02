
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signUp } from '../services/authServices';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); 

    const userCredential = await signUp(email, password, name);
    if (!userCredential) {
      setError('Failed to sign up. Please check your credentials.');
    
    } else {

      console.log("Sign-up successful:", userCredential);
      navigate('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <input  type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required/>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default SignUp;
