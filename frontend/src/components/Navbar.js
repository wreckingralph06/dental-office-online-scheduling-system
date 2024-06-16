import { AppBar, Box, Toolbar, Typography, Button, ButtonBase, Container } from '@mui/material';
import Link from 'next/link';

const Navbar = () => {
  return (
    <AppBar 
      position="static"
      sx={{ backgroundColor: 'white', color: 'black' }}
    >
      <Container maxWidth="lg">
        <Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<Link href="/" passHref>
							<ButtonBase>
								<Typography 
                  variant="h6" 
                  style={{ color: 'black', fontWeight: 'bold' }}
                >
									DentHere App
								</Typography>
							</ButtonBase>
						</Link>
					</Box>
					<Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} href="/about" 
              sx={{ 
                color: 'black', 
                fontSize: "15px" 
              }}
            >
              About
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              href="/contact" 
              sx={{ 
                color: 'black',
                fontSize: "15px" 
              }}
            >
              Contact
            </Button>
            <Button 
              component={Link} 
              href="/signup" 
              variant="contained"
              sx={{
                borderRadius: 20,
                backgroundColor: '#2196f3',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1976d2',
                }
              }}
            >
              Sign Up
            </Button>
						<Button 
              component={Link} 
              href="/signin" 
              sx={{
                borderRadius: 20,
                backgroundColor: '#2196f3',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#1976d2',
                }
              }}
            >
              Sign In
            </Button>
					</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;