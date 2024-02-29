import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface LoginTypes {
  phone: string;
  password: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  async function login({ phone, password }: LoginTypes) {
    try {
      setLoading(true);
      let res = await axios.post("/api/auth/login", { phone, password });
      let data = await res.data;
      console.log(data);
      localStorage.setItem("mca-user", JSON.stringify(data.user));
      setUser(data.user);
      return navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, login };
};
