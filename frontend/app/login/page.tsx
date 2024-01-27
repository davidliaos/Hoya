// @client
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { makeLoginRequest } from '../../utils/api'; // Adjust the import path based on your project structure

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = event => {
    event.preventDefault();
    try {
      const response = await makeLoginRequest(username, password);
      if (response.success) {
        router.push('/app/page'); // Redirect to main page on successful login
      } else {
        // Handle login failure
        console.error('Login failed:', response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
