
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { signUp } from '../services/authServices';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-200 w-full">
      <div className="p-8 rounded-lg flex flex-col w-full lg:w-[500px]">
        <p className = "text-2xl font-bold text-center bg-white bg-clip-text text-transparent">
          Welcome,
        </p>
        <p className="text-2xl font-semibold mb-4 text-center bg-white bg-clip-text text-transparent">
          Create a RotReset Account!
        </p>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input  
          type="name"
          placeholder="Name"
          className="rounded-[12px] bg-white bg-opacity-50 text-black text-opacity-70 py-7 px-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

          <Input
            type="email"
            placeholder="Email Address"
            className="rounded-[12px] bg-white bg-opacity-50 text-black text-opacity-70 py-7 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="rounded-[12px] bg-white bg-opacity-50 text-black text-opacity-70 py-7 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] py-6 mt-2" > Sign Up</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <form className="flex flex-col gap-2 w-full mt-16 "> 
          <p className="text-l font-semibold text-center bg-white bg-clip-text text-transparent">
            Alternative Sign-In Options
          </p>
          <Button type="button" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex h-16 justify-center items-center">
              <img src="googleLogo.png" alt="Google" className="h-6 w-6 mr-2" />
              <span>Sign in with Google</span>
          </Button>
          <Button type="button" className=" bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-center justify-center h-16">
              <img src="facebookLogo.png" alt="Facebook" className="h-6 w-6 mr-2" />
              <span>Sign in with Facebook</span>
          </Button>
        <Button type="button" className=" bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-center justify-center h-16">
              <img src="xLogo.png" alt="X" className="h-6 w-6 mr-2" />
              <span>Sign in with X</span>
          </Button>
          <Button type="button" className=" bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-center justify-center h-16">
              <img src="appleLogo.png" alt="Apple" className="h-6 w-6 mr-2" />
              <span>Sign in with Apple</span>
          </Button>
        </form>
        <p className = "text-l mt-20 font-semibold text-center bg-white bg-clip-text text-transparent">
          Already have an account?  
        <a href = "/signin" className="text-purple-450 cursor-pointer"> Sign in</a>
      </p>
      </div>
    </div>
  );
};

export default SignUp;
