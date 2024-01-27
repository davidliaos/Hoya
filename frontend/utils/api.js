export async function makeLoginRequest(username, password) {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  