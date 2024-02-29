import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useLogin } from "../hook/useLogin";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    phone: "",
    password: "",
  });
  
  const { loading, login } = useLogin();
  
  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInfo.phone.length !== 10) return toast.error("Invalid phone number");
    await login(userInfo)
  };

  return (
    <div className="mainDiv">
      <div className="loginDiv">
        <h1 className="loginH1">Login</h1>
        <form className="loginForm" onSubmit={handleForm}>
          <input type="number" value={userInfo.phone} onChange={(e) => setUserInfo((user) => ({ ...user, phone: e.target.value }))} placeholder="Enter Your Phone" className="formInput" required />
          <input type="password" value={userInfo.password} onChange={(e) => setUserInfo((user) => ({ ...user, password: e.target.value }))} placeholder="Enter Your Password" className="formInput" required />
          <button disabled={loading} type="submit" className="lsBtn disabled:opacity-40">Login</button>
        </form>
        <p className="loginP">
          New User? <Link to="/signup">Sign Up</Link>{" "}
        </p>
      </div>
    </div>
  )
}

export default Login
