import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "./Auth.css"
import { useAuth } from "../../context/AuthContext";

function Login({onLogin}){
    const [username,setUserName]=useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ role, setRole]=useState("user");
    const [ error, setError]=useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin=async(e)=>{
        e.preventDefault();
        const success = await login(username,email,password);
        if(success){
            navigate("/")
        }else{
            setError("Invalid email or password.")
        }
    }

    return(
        <>
        <div className="container">
            <form onSubmit={handleLogin} className="form">
                <h2 className="name"> Login </h2>
                {error && <p className="error"> {error} </p>}
                <br/>
                <table>
                    <tbody>
                        <tr>
                            <td> <label> Name :  </label> </td>
                            <td> <input type="text" placeholder="Name" value={username} onChange={(e)=>setUserName(e.target.value)} required/> </td>
                        </tr>
                        <tr>
                            <td> <label> Email :  </label> </td>
                            <td> <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/> </td>
                        </tr>
                        <tr>
                            <td> <label> Password:  </label> </td>
                            <td> <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/> </td>
                        </tr>
                        <tr>
                            <td> <label> Role :  </label> </td>
                            <td> <select value={role} onChange={(e)=>{setRole(e.target.value)}}> 
                                <option value="user"> User </option>
                                <option value="admin"> Admin </option>
                            </select> </td>
                        </tr>
                    </tbody>
                </table>
                    <button type="submit"> Login </button>
                <p> Don't have an acount ? <Link to='/signup'> Signup </Link> </p>
            </form>
        </div>
        </>
    )
}

export default Login