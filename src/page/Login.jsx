import React, { useState } from "react";
import { Link } from "react-router";
import { GoogleAuthProvider, signInWithEmailAndPassword  , signInWithPopup} from "firebase/auth";
import { auth } from "../firebase.config";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlices";
import { getDatabase, ref, set } from "firebase/database";




const Login = () => {

  const db = getDatabase();
  const provider = new GoogleAuthProvider();
   const dispatch = useDispatch();
  const [userInfo, setuserInfo] = useState({
    email: "",
    pass: "",
  });

  const navigate = useNavigate()
  const handleemail = (e) => {
    setuserInfo((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const handlepass = (e) => {
    setuserInfo((prev) => {
      return {
        ...prev,
        pass: e.target.value,
      };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (userInfo.email && userInfo.pass) {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.pass)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user)
          if(user.emailVerified){
            dispatch(userLoginInfo(user)) // set data in redux
            // localStorage.setItem('login' , JSON.stringify(user))  //convert so browser can understand
navigate('/homepage')
          }else{
            toast.error("Please verify your email")
          }
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode)
          
           if (errorCode.includes("auth/invalid-credential")) {
                      toast.error("Invalid Email or Pass");
                      setuserInfo({
                        name: "",
                        email: "",
                        pass: "",
                      });
                    }
        });
    } else {
      alert("email and pass required"); //edit this with toast
    }
  };

  const handleGoogleLogin=()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    
    // The signed-in user info.
    const user = result.user;

    set(ref(db, 'userslist/' + user.uid), {
    name: user.displayName,
    email: user.email,
  });
    dispatch(userLoginInfo(user)) 
    navigate('/homepage')
    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
   console.log(errorCode)
  });
  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900 font-display">
      <Toaster />
      
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login in to your account
            </h1>
            <form
              onSubmit={handleLogin}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={handleemail}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  onChange={handlepass}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>

              </p>
                <button onClick={handleGoogleLogin} className="text-yellow-500 cursor-pointer">Sign In with Google</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
