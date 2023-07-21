import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    let navigate = useNavigate();
    const [cred,setcred] = useState({email:"", username:"", password:""}) 
    const changed =(e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
        // console.log(cred);
    }
    const handlesubmit = async (e)=>{
        e.preventDefault();
        const user = await fetch("http://localhost:12000/api/auth/createuser",{
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name:cred.username,email:cred.email,password:cred.password})
          });
          const json = await user.json();
          console.log(json);
          if (json.success){
            localStorage.setItem('token',json.authtokan)
            navigate('/login');
          }
    }


    return (
        <div className='container'>
        <h2>Create an Account to use InoteBook</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={changed}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="floatingInputGroup1">Username</label>
                    <input type="text" className="form-control" id="username" name="username" onChange={changed}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={changed}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
