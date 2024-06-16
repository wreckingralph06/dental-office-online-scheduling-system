import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import { useState } from 'react';
import NextLink from 'next/link';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ width: '60%', mx: 'auto' }}
          />
          <TextField
            margin="normal"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ width: '60%', mx: 'auto' }}
          />
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