import { useState } from "react";
import { Link } from "react-router-dom"

const SignUp = () => {
    const [userInfo, setUserInfo] = useState({
        fullName:"",
        phone: "",
        password: "",
    });

    return (
        <div className="mainDiv">
            <div className="loginDiv">
                <h1 className="loginH1">SignUp</h1>
                <form className="loginForm">
                    <input value={userInfo.fullName} type="text" placeholder="Enter Your FullName" className="formInput" required />
                    <input type="number" placeholder="Enter Your Phone" className="formInput" required />
                    <input type="password" placeholder="Enter Your Password" className="formInput" required />
                    <button type="submit" className="lsBtn">SignUp</button>
                </form>
                <p className="loginP">
                    Already have an account? <Link to="/login">Login</Link>{" "}
                </p>
            </div>
        </div>
    )
}

export default SignUp
