import { Container, Typography, TextField, Button, Box, Link } from '@mui/material';
import NextLink from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signupUser } from '@/utils/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
		setError('');

    try {
      await signupUser({ email, password, firstName, lastName });
			router.push('/signin');
    } catch (error) {
			setError(error.message || 'Error signing up');
      console.error('Error signing up:', error);
    }
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
						label="First Name"
						name="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						sx={{ width: '60%' }}
					/>
					<TextField
						margin="normal"
						label="Last Name"
						name="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						sx={{ width: '60%' }}
					/>
					<TextField
						margin="normal"
						label="Email"
						type="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						sx={{ width: '60%' }}
					/>
					<TextField
						margin="normal"
						label="Password"
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						sx={{ width: '60%' }}
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