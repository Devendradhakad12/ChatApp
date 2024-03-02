import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom"
import { useSignup } from "../hook/useSignUp";

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: "",
        phone: "",
        password: "",
    });

    const {loading,signup} = useSignup()
    const handleForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (userInfo.phone.length !== 10) return toast.error("Invalid phone number");
        await signup(userInfo)
      };

    return (
        <div className="mainDiv">
            <div className="loginDiv">
                <h1 className="loginH1">SignUp</h1>
                <form className="loginForm" onSubmit={handleForm}>
                    <input value={userInfo.fullName} onChange={(e) => setUserInfo((user) => ({ ...user, fullName: e.target.value }))} type="text" placeholder="Enter Your FullName" className="formInput" required />
                    <input value={userInfo.phone} onChange={(e) => setUserInfo((user) => ({ ...user, phone: e.target.value }))} type="number" placeholder="Enter Your Phone" className="formInput" required />
                    <input value={userInfo.password} onChange={(e) => setUserInfo((user) => ({ ...user, password: e.target.value }))} type="password" placeholder="Enter Your Password" className="formInput" required />
                    <button disabled={loading} type="submit" className="lsBtn disabled:opacity-35">SignUp</button>
                </form>
                <p className="loginP">
                    Already have an account? <Link to="/login">Login</Link>{" "}
                </p>
            </div>
        </div>
    )
}

export default SignUp
