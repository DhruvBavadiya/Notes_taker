import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    let navigate = useNavigate();
   const [cred,setcred] = useState({email:"", password:""})
    const onchange =(e)=>{
        setcred({ ...cred, [e.target.name]: e.target.value })
        // console.log(cred);
    }

    const handlesubmit = async (e)=>{
        e.preventDefault();
        const user = await fetch("http://localhost:12000/api/auth/login",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:cred.email,password:cred.password})
          });
          const json = await user.json();
        //   console.log(json);
          if (json.success){
            localStorage.setItem('token',json.authtokan)
            // console.log(localStorage.getItem('token'));
            navigate('/');
          }
    }

    return (
        <div className='container'>
        <h2 className='d-flex justify-content-around'>Login to use Inotebook</h2>
            <form className="mx-auto col-10 col-md-8 col-lg-6" style={{width:'27'}} onSubmit={handlesubmit}>
                <div className="mb-3">

                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value ={cred.email} aria-describedby="emailHelp" onChange={onchange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value ={cred.password} onChange={onchange} id="password" name="password" autoComplete="current-password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Login</button>
                </form>
                <button type="submit" className="btn btn-primary mx-4" >Create Account</button>
        </div>
    )
}

export default Login
