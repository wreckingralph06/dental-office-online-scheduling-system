import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		console.log("localStorage: ", localStorage)
		const token = localStorage.getItem('token');
		console.log("token: ", token);
		if (token) {
			setIsAuthenticated(true);
		} else {
			router.push('/signin');
		}
		setIsLoading(false);
	}, [router]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return isAuthenticated ? children : null;
};

export default ProtectedRoute;