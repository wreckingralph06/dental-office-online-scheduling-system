import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
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
          Sign Up
        </Typography>
        <form 
					onSubmit={handleSubmit} 
					style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
				>
					<TextField
						margin="normal"
						label="Username"
						name="username"
						value={formData.username}
						onChange={handleChange}
						sx={{ width: '60%' }}
					/>
					<TextField
						margin="normal"
						label="Email"
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						sx={{ width: '60%' }}
					/>
					<TextField
						margin="normal"
						label="Password"
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						sx={{ width: '60%' }}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						sx={{ mt: 2, width: '60%' }}
					>
						Sign Up
					</Button>
        </form>
				<Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body1">
            Already a user?{' '}
            <NextLink href="/signin" passHref>
              <Link underline="hover">Sign In</Link>
            </NextLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;