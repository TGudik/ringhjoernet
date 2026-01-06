

export default function AdminRoute({ children }) {

  const { user, loading } = useAuthStore();

  if (loading) return <Spinner />;
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
