import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

 const navigate = useNavigate ();

 const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  }

 const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = loginInfo;
    if (!email || !password) {
        return handleError('Please fill in all fields') 
    }
    try {
        const url = 'http://localhost:5000/auth/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
        });
        const result = await response.json();
        const {success, message,jwtToken , name,  error} = result;
        if (success) {
            handleSuccess(message);
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('loggedInUser', name);
            setTimeout(() => {
                navigate('/home')
            }, 1000);
        } else if (error) {
            const details = error?.details[0].message;
            handleError(details);
        }else if (!success) {
            handleError(message);
        }
        console.log(result);
    }catch (err) {
       handleError(err);
    }

 }

  return (
    <div className="flex justify-between  h-screen bg-gray-100">
      <div className=" h-full w-full flex  bg-gray-200">
        <img src="/welcome.png" alt="Logo" className="w-full h-full mb-4" />
      </div>


      <div className=" flex justify-center items-center w-full h-full">'
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login To Your Account</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              User name or registered email id
            </label>
            <input
              id="email"
              type="email"
              name='email'
              value={loginInfo.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={loginInfo.password}
              onChange={handleChange}
              placeholder='Enter your password'
              name='password'
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
          <button type="submit" className="w-full bg-[#8AAE4A] text-white py-2 rounded-md">
            Login
          </button>
        </form>

      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
