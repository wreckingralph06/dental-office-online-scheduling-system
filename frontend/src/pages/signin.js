import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import { useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signinUser } from '@/utils/api';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      await signinUser({ email, password });
      router.push('/dashboard');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <form 
          onSubmit={handleSubmit} 
          style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}
        >
          <TextField
            margin="normal"
            required
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={Boolean(error)}
            sx={{ width: '60%', mx: 'auto' }}
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={Boolean(error)}
            sx={{ width: '60%', mx: 'auto' }}
          />
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2, width: '60%', mx: 'auto' }}
          >
            Sign In
          </Button>
        </form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body1">
            New user?{' '}
            <NextLink href="/signup" passHref>
              <Link underline="hover">Sign Up</Link>
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;