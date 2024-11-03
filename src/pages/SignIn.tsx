
import { useNavigate } from 'react-router-dom';

import React, { useState } from 'react';
import { signIn } from '@/services/authServices';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await signIn(email, password);
      if (user) {
        console.log("Signed in successfully:", user);
        navigate('/');

      } else {
        console.log("Sign-in failed.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-purple-200 w-full">
      <div className="p-8 rounded-lg w-full flex flex-col w-full">
        <p className = "text-2xl font-bold text-center bg-white bg-clip-text text-transparent">
           Welcome back,
        </p>
        <p className="text-2xl font-semibold mb-4 text-center bg-white bg-clip-text text-transparent">
          Sign In!
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSignIn}> 
          <Input
            type="email"
            placeholder="Email Address"
            className="rounded-[12px] bg-white bg-opacity-50 text-black text-opacity-70 py-7 px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            className="rounded-[12px] bg-white bg-opacity-50 text-black text-opacity-70 py-7 px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] py-6 mt-2">
            Sign In
          </Button>
        </form>
        <form className="flex flex-col gap-2 w-full mt-16 " onSubmit={handleSignIn}> 
        <p className="text-l font-semibold text-center bg-white bg-clip-text text-transparent">
        Alternative Sign-In Options
        </p>
        <Button type="button" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-left justify-left h-16">
            <img src="googleLogo.png" alt="Google" className="h-6 w-6 mr-2" />
            <span>Sign in with Google</span>
        </Button>
        <Button type="button" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-left justify-left h-16">
            <img src="facebookLogo.png" alt="Facebook" className="h-6 w-6 mr-2" />
            <span>Sign in with Facebook</span>
        </Button>
       <Button type="button" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-left justify-left h-16">
            <img src="xLogo.png" alt="X" className="h-6 w-6 mr-2" />
            <span>Sign in with X</span>
        </Button>
        <Button type="button" className="bg-white bg-opacity-75 text-purple-450 font-bold rounded-[12px] flex items-left justify-left h-16 w-full">
            <img src="appleLogo.png" alt="Apple" className="h-6 w-6 mr-2" />
            <span>Sign in with Apple</span>
        </Button>
      </form>
      <p className = "text-l mt-20 font-semibold text-center bg-white bg-clip-text text-transparent">
        Don't have an account?  
        <a href = "/signup" className="text-purple-450 cursor-pointer"> Sign up</a>
      </p>
      </div>
    </div>
  );
};

export default SignIn;

