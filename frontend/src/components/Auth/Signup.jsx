import "./Auth.css"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Signup({onSignup}){
    const [username,setUserName]=useState("");
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("user");
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("")
    const navigate = useNavigate()

    const handleSignup=async(e)=>{
        e.preventDefault();

        try{
            
            const response = await 
            fetch("http://127.0.0.1:8000/api/register/",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({username,email,password,role})
            });

            if(response.ok){
                const data = await response.json();
                localStorage.setItem("access",data.access)
                localStorage.setItem("refresh",data.refresh)
                localStorage.setItem("bakesmart_user",JSON.stringify(data));
                setSuccess("Signup successful ! Redirecting...")
                setTimeout(()=>{
                navigate('/');
                },2000);
            }else{
                const errorData = await response.json()
                setError(errorData.error || "Signup failed.")
                console.log(errorData)
            }
        }catch(err){
            setError("Something went wrong.Try again.")
            console.log(err)
        }
    }

    return(
        <>
        <div className="container">
            <form onSubmit={handleSignup} className="form">
                <h2 className="name"> Signup </h2>
                {error && <p className="error"> {error} </p>}
                {success && <p className="success"> {success} </p>}
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
                            <td> <label> Password: </label> </td>
                            <td> <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>  </td>
                        </tr>
                        <tr>
                            <td> <label> Role :  </label> </td>
                            <td> <select value={role} onChange={(e)=>{setRole(e.target.value)}}>
                                <option value="user"> User </option>
                                <option value="admin"> Admin </option>
                            </select>  </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit"> Signup </button>
                <p> Have an account ? <Link to='/login'> Login </Link> </p>
            </form>
        </div>
        </>
    )
}

export default Signup;