////////////////////////            REGISTER

// import axios from "axios";

// import { FidgetSpinner } from "react-loader-spinner";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";

// import { useAuth } from "../Context/AuthContext";

// const test = () => {
//   const [loading, setLoading] = useState(false);
//   const {
//     authUser,
//     setAuthUser,
//     isLoggedIn,
//     setIsLoggedIn,
//     userId,
//     setUserId,
//   } = useAuth();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // ------------------------- handlers ----------------------
//   const notify = () => {
//     toast("Sign up successfully");
//   };
//   const notifyError = (err) => {
//     toast(err);
//   };
//   const handleSubmitting = async (data) => {
//     setLoading(true);
//     console.log(data);
//     const { image, email, name, password, ConfirmPassword } = data;
//     console.log(image);
//     const formData = new FormData();
//     formData.append("photo", image[0]);
//     formData.append("email", email);
//     formData.append("username", name);
//     formData.append("password", password);
//     formData.append("confirm_password", ConfirmPassword);
//     let response;
//     try {
//       response = await axios.post(
//         "https://reactjs-blog.onrender.com/v1/users/sign-up",
//         formData
//         // {
//         //   email: data.email,
//         //   username: data.name,
//         //   password: data.password,
//         //   confirm_password: data.ConfirmPassword,
//         // }
//       );
//       console.log(response);
//       console.log("formData", formData);
//       setLoading(false);
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 2000);
//       notify();
//       setIsLoggedIn(true);
//       setAuthUser(response.data.data.user.username);
//       setUserId(response.data.data.user._id);
//       localStorage.setItem("token", response.data.data.access_token);
//       localStorage.setItem("isLoggedIn", true);
//       localStorage.setItem("userName", response.data.data.user.username);
//       localStorage.setItem("id", response.data.data.user._id);
//     } catch (err) {
//       setLoading(false);
//       notifyError(err.response.data.message[0]);
//     }
//   };

//   return (
//     <>
//       <div className="register-background">
//         <ToastContainer />
//         <div className="flex mt-10 m-auto justify-center">
//           <form
//             className="w-3/4 lg:w-1/4 md:w-1/2 sm:w-full loginForm"
//             onSubmit={handleSubmit(handleSubmitting)}
//           >
//             <div class="text-center flex flex-col gap-5 w-full ">
//               <h1 className="text-orange-500  text-4xl">Register</h1>
//               <div className="form-control w-full ">
//                 <label htmlFor="name" className="label">
//                   <span className="label-text text-white">User name</span>
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   placeholder="Type here"
//                   className="input input-bordered w-full bg-transparent border-white text-white "
//                   {...register("name", {
//                     required: "name is required",
//                   })}
//                 />
//               </div>
//               {errors.name && (
//                 <span style={{ color: "red" }}>{errors.name.message}</span>
//               )}
//               <div className="form-control w-full ">
//                 <label htmlFor="email" className="label">
//                   <span className="label-text text-white ">Email</span>
//                 </label>
//                 <input
//                   id="email"
//                   type="text"
//                   placeholder="Type here"
//                   className="input input-bordered w-full bg-transparent border-white text-white "
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
//                       message: "invalid email address",
//                     },
//                   })}
//                 />
//               </div>
//               {errors.email && (
//                 <span style={{ color: "red" }}>{errors.email.message}</span>
//               )}
//               <div className="form-control w-full ">
//                 <label htmlFor="password" className="label">
//                   <span className="label-text text-white">Password</span>
//                 </label>
//                 <input
//                   id="Password"
//                   type="password"
//                   placeholder="Type here"
//                   className="input input-bordered w-full bg-transparent border-white text-white "
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: 5,
//                   })}
//                 />
//               </div>
//               {errors.password && (
//                 <span style={{ color: "red" }}>{errors.password.message}</span>
//               )}
//               <div className="form-control w-full ">
//                 <label htmlFor="password" className="label">
//                   <span className="label-text text-white">
//                     Confirm Password
//                   </span>
//                 </label>
//                 <input
//                   id="ConfirmPassword"
//                   type="password"
//                   placeholder="Type here"
//                   className="input input-bordered w-full bg-transparent border-white text-white "
//                   {...register("ConfirmPassword", {
//                     required: "Confirm Password is required",
//                     minLength: 5,
//                   })}
//                 />
//               </div>
//               {errors.ConfirmPassword && (
//                 <span style={{ color: "red" }}>
//                   {errors.ConfirmPassword.message}
//                 </span>
//               )}
//               <div className="form-control w-full ">
//                 <label htmlFor="image" className="label">
//                   <span className="label-text text-white">Image</span>
//                 </label>
//                 <input
//                   id="image"
//                   type="file"
//                   className="file-input file-input-warning w-full max-w-xs bg-transparent border-white text-white "
//                   {...register("image", {
//                     required: "image is required",
//                   })}
//                 />
//               </div>
//               {errors.image && (
//                 <p style={{ color: "red" }}>{errors.image?.message}</p>
//               )}
//               {loading ? (
//                 <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
//                   <FidgetSpinner />
//                 </div>
//               ) : (
//                 <button className="btn bg-orange-500" type="submit">
//                   Sing up
//                 </button>
//               )}
//               <div className="text-white text-lg flex justify-around">
//                 <p className="py-2">Have account?</p>
//                 <button
//                   type="button"
//                   className="btn bg-transparent hover:bg-orange-500 border-white"
//                 >
//                   <Link to="/login">Log in</Link>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default test;

//////////////////////////////          LOGIN        //////////////////////////////

// import { FidgetSpinner } from "react-loader-spinner";
// import axios from "axios";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../Context/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const Login = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {
//     authUser,
//     setAuthUser,
//     isLoggedIn,
//     setIsLoggedIn,
//     userId,
//     setUserId,
//   } = useAuth();
//   const {
//     register,
//     handleSubmit,
//     resetField,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   // ------------------------ handlers ------------------
//   const notify = (msg) => {
//     toast(msg);
//   };
//   const notifyError = () => {
//     toast("Invalid Email or password");
//   };
//   const handleSubmitting = async (data) => {
//     setLoading(true);
//     console.log(data);
//     try {
//       const response = await axios.post(
//         "https://reactjs-blog.onrender.com/v1/users/sign-in",
//         {
//           email: data.email,
//           password: data.password,
//         }
//       );
//       setLoading(false);
//       console.log("response", response);
//       setIsLoggedIn(true);
//       console.log(isLoggedIn);
//       // setAuthUser(response.data.data.user.username);
//       notify(response.data.length);
//       resetField("email");
//       resetField("password");
//       setTimeout(() => {
//         navigate("/", { replace: true });
//       }, 2000);

//       setAuthUser(response.data.data.user.username);
//       setUserId(response.data.data.user._id);
//       localStorage.setItem("token", response.data.data.access_token);
//       localStorage.setItem("isLoggedIn", true);
//       localStorage.setItem("userName", response.data.data.user.username);
//       localStorage.setItem("id", response.data.data.user._id);
//       localStorage.setItem("profileImg", response.data.data.user.photo[0].url);
//     } catch (err) {
//       setLoading(false);
//       notifyError(err.response.data.message);
//       resetField("email");
//       resetField("password");
//       setIsLoggedIn(false);
//       localStorage.removeItem("isLoggedIn");
//     }
//   };

//   return (
//     <>
//       <div className="login-background">
//         <ToastContainer />
//         <div className="flex mt-10 m-auto justify-center relative   ">
//           <form
//             className="w-3/4 lg:w-1/4 md:w-1/2 sm:w-3/4  loginForm "
//             onSubmit={handleSubmit(handleSubmitting)}
//           >
//             <div className="text-center flex flex-col gap-5 w-full">
//               <h1 className="text-orange-500  text-4xl">Login</h1>
//               <div className="form-control w-full ">
//                 <label htmlFor="email" className="label ">
//                   <span className="label-text text-white ">Email</span>
//                 </label>
//                 <input
//                   id="email"
//                   type="text"
//                   placeholder="Type here"
//                   className="input input-bordered w-full bg-transparent border-white text-white"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value:
//                         /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
//                       message: "invalid email address",
//                     },
//                   })}
//                 />
//               </div>
//               {errors.email && (
//                 <span style={{ color: "red" }}>{errors.email?.message}</span>
//               )}
//               <div className="form-control w-full text-white ">
//                 <label htmlFor="password" className="label">
//                   <span className="label-text text-white ">Password</span>
//                 </label>
//                 <input
//                   id="Password"
//                   type="password"
//                   placeholder="password"
//                   className="input input-bordered w-full bg-transparent border-white text-white "
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: 5,
//                   })}
//                 />
//               </div>
//               {errors.password && (
//                 <p style={{ color: "red" }}>{errors.password?.message}</p>
//               )}
//               {loading ? (
//                 <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
//                   <FidgetSpinner />
//                 </div>
//               ) : (
//                 <button
//                   className="btn bg-orange-500 hover:bg-orange-700"
//                   type="submit"
//                 >
//                   Login
//                 </button>
//               )}
//               <div className="text-white lg:text-lg lg:flex justify-around">
//                 <p className="lg:pt-2 ">Don't have account?</p>
//                 <button
//                   type="button"
//                   className="btn bg-transparent hover:bg-orange-500 border-white"
//                 >
//                   <Link to="/register">Sign up</Link>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

/////////////////////////////////  ADD POST      /////

// import axios from "axios";

// import { FidgetSpinner } from "react-loader-spinner";
// import { toast, ToastContainer } from "react-toastify";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";

// import styles from "./register.module.css";

// const AddPost = () => {
//   const [loading, setLoading] = useState(false);
//   const [authUser, setAuthUser] = useState(null);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleSubmitting = async (data) => {
//     setLoading(true);
//     const { image, title, description } = data;
//     console.log(data);
//     const userName = localStorage.getItem("userName");
//     setAuthUser(userName);
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("content", description);
//     formData.append("photo", image[0]);

//     console.log(formData);
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: { Authorization: `Bearer ${token}` },
//     };
//     try {
//       const response = await axios.post(
//         "https://reactjs-blog.onrender.com/v1/post",
//         formData,
//         config
//       );
//       setLoading(false);
//       console.log(response);
//       toast.success("Posted successfully", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: false,
//         draggable: false,
//         progress: undefined,
//         theme: "dark",
//       });
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       toast.error(`${err.response.data} 😞`, {
//         position: "top-right",
//         autoClose: false,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//       });
//     }
//   };
//   return (
//     <>
//       <div className="add-background">
//         <div className="flex mt-10 m-auto justify-center  ">
//           <form
//             className="w-3/4 lg:w-1/4 md:w-1/2 sm:w-full z-1 loginForm"
//             onSubmit={handleSubmit(handleSubmitting)}
//           >
//             <div class="text-center flex flex-col gap-5 w-full">
//               <div className="form-control w-full ">
//                 <label htmlFor="title" className="label">
//                   <span className="label-text text-white">Title</span>
//                 </label>
//                 <input
//                   id="title"
//                   type="text"
//                   placeholder="Title"
//                   className="input input-bordered w-full bg-transparent border-white text-white "
//                   {...register("title", {
//                     required: "Title is required",
//                   })}
//                 />
//               </div>
//               {errors.title && (
//                 <span style={{ color: "red" }}>{errors.title?.message}</span>
//               )}
//               <div className="form-control w-full ">
//                 <label htmlFor="description" className="label">
//                   <span className="label-text text-white">Description</span>
//                 </label>
//                 <textarea
//                   id="description"
//                   type="text"
//                   placeholder="Description"
//                   className="input input-bordered textarea-md w-full bg-transparent border-white text-white  "
//                   {...register("description", {
//                     required: "Description is required",
//                   })}
//                 />
//               </div>
//               {errors.description && (
//                 <p style={{ color: "red" }}>{errors.description?.message}</p>
//               )}

//               <div className="form-control w-full ">
//                 <label htmlFor="image" className="label">
//                   <span className="label-text text-white">Image</span>
//                 </label>
//                 <input
//                   id="image"
//                   type="file"
//                   className="file-input file-input-warning w-full max-w-xs bg-transparent border-white text-white "
//                   {...register("image", {
//                     required: "image is required",
//                   })}
//                 />
//               </div>
//               {errors.image && (
//                 <p style={{ color: "red" }}>{errors.image?.message}</p>
//               )}
//               {loading ? (
//                 <div className="container mx-auto text-center h-10 flex justify-center items-center w-5">
//                   <FidgetSpinner />
//                 </div>
//               ) : (
//                 <button
//                   className="btn bg-orange-500 hover:bg-orange-600"
//                   type="submit"
//                 >
//                   Add
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Posting Error */}
//         <ToastContainer
//           limit={1}
//           position="top-right"
//           autoClose={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           theme="dark"
//         />

//         {/* Posting success */}
//         <ToastContainer
//           position="top-right"
//           autoClose={1500}
//           limit={1}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick={false}
//           rtl={false}
//           pauseOnFocusLoss
//           draggable={false}
//           pauseOnHover={false}
//           theme="dark"
//         />
//       </div>
//     </>
//   );
// };

// export default AddPost;

//////////////////////////////////////////////////

<div className={`${styles.info} mt-2`}>
  <div className={`${styles.profileImg} text-black `}>
    <img
      src={data.photo?.length > 0 ? data.photo[0].url : "/images.png"}
      alt=""
    />
    <p className=" mt-3 font-bold text-xl">{data.username}</p>
  </div>
  <div className={`  text-start `}>
    <p className=" mt-3  text-xl">Bio will be here</p>
    {/* <h1 className="m-auto text-orange-400 text-2xl font-bold">
              Info
            </h1>{" "}
            <p>Email: {data.email}</p> */}
  </div>
  <div className="">
    {id === userId ? (
      <button className="btn bg-orange-400 hover:bg-orange-500 border-0 py-0 ml-36">
        Edit profile
      </button>
    ) : (
      ""
    )}
    {/* <button className="btn bg-orange-400 hover:bg-orange-500 border-0 w-28 ">
                  Add post
                </button> */}
  </div>
</div>;
