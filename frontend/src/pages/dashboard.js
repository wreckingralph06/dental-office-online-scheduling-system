import ProtectedRoute from '@/components/ProtectedRoute';

const Dashboard = () => {
	return (
		<ProtectedRoute>
			<h1>Dashboard</h1>
			<h1>This is the User Dashboard!</h1>
		</ProtectedRoute>
	);
};

export default Dashboard;