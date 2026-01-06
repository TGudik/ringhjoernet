import useAuthStore from "../../store/authStore";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading)

  if (loading) return <p>loading</p>
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
