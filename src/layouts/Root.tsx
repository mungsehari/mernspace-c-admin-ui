import { useQuery } from "@tanstack/react-query";
import { self } from "../http/api";
import { useAuthStore } from "../store";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { AxiosError } from "axios";

const getSelf = async () => {
  const { data } = await self();
  return data;
};
const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: (failureCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
  });
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);
  if (isLoading) return <p>Loading...</p>;
  return <Outlet />;
};

export default Root;
