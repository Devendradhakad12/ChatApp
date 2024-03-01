import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

interface SignupTypes {
  fullName: string;
  phone: string;
  password: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  async function signup({ phone, password, fullName }: SignupTypes) {
    try {
      setLoading(true);
      let res = await axios.post("/api/auth/signup", {
        phone,
        password,
        fullName,
      });
      let data = await res.data;
      setUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return { signup, loading };
};
