import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";
import Spinner from "../../ui/Spinner";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  return children;
  //   const navigate = useNavigate();
  //   const { isLoading, data } = useUser();

  //   useEffect(() => {
  //     if (!data && !isLoading) navigate("/login");
  //   }, [data, isLoading, navigate]);
  //   console.log(data);

  //   if (isLoading) return <Spinner />;
  //   if (data) return children;
};

export default ProtectedRoute;
