
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
    <div >
        <p>Sign In</p>
        <form className='flex flex-col gap-4' onSubmit={handleSignIn}>
        <Input type="email"
            placeholder="Email"
            className='bg-white '
            value={email}
            onChange={(e) => setEmail(e.target.value)} />

        <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" >Sign In</Button>
        </form>

    </div>
    
  );
};

export default SignIn;
