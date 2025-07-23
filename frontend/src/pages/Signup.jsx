import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../api/Endpoint";

export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    document.title = "Signup";

    const signupHandler = async (e) => {
        try {
            e.preventDefault();
            const res = await post("/auth/signup", {
                username,
                email,
                password
            });

            if (res.status === 201) {
                toast.success(res?.data?.message);

                setUsername("");
                setEmail("");
                setPassword("");
                navigate("/login");
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Signup failed");
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[95%] max-w-6xl custom-shadow px-4 py-6 md:p-8 h-auto md:h-[90vh] flex flex-col md:flex-row items-center justify-center bg-white rounded-lg">

                {/* Left Image Section */}
                <div className="hidden md:block md:w-1/2 h-64 md:h-full overflow-hidden rounded-md">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.pexels.com/photos/1181425/pexels-photo-1181425.jpeg"
                        alt="Signup Visual"
                    />
                </div>

                {/* Right Form Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-8 items-center justify-center h-full py-8 px-4">
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-2xl md:text-3xl text-zinc-700 font-semibold">Create Your Account</h1>
                        <p className="text-sm text-zinc-500">Sign up to get started with RentMyPlace</p>
                    </div>

                    <form onSubmit={signupHandler} className="w-full max-w-sm flex flex-col gap-6">
                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-600">Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="johndoe@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="password" className="text-sm font-medium text-zinc-600">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition pr-10"
                            />
                            <div
                                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
                        >
                            Sign Up
                        </button>

                        <p className="text-center">already have an account ? <Link to='/login' className="text-sky-500 underline font-semibold">Signin</Link></p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;