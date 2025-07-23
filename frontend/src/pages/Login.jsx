import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { post } from "../api/Endpoint";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/reducers/AuthSlice";

export const Login = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    document.title = "Login";
    const navigate = useNavigate();

    const loginHandler = async (e) => {
        try {
            e.preventDefault();

            const res = await post("/auth/login", {
                email,
                password
            });

            if (res.status === 200) {
                toast.success(res?.data?.message);
                dispatch(setUser(res?.data?.user));
                setEmail("");
                setPassword("");
                navigate("/");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-100">
            <div className="w-[95%] max-w-6xl custom-shadow px-4 py-6 md:p-8 h-auto md:h-[90vh] flex flex-col md:flex-row items-center justify-center bg-white rounded-lg">

                {/* Left Image Section */}
                <div className="hidden md:block md:w-1/2 h-64 md:h-full overflow-hidden rounded-md">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.pexels.com/photos/1876045/pexels-photo-1876045.jpeg"
                        alt="Login Visual"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 flex flex-col gap-8 items-center justify-center h-full py-8 px-4">
                    <div className="text-center md:text-left space-y-2">
                        <h1 className="text-2xl md:text-3xl text-zinc-700 font-semibold">Welcome Back to RentMyPlace!</h1>
                        <p className="text-sm text-zinc-500">Sign in to your account</p>
                    </div>

                    <form onSubmit={loginHandler} className="w-full max-w-sm flex flex-col gap-6">
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-600">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="johndoe@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition"
                            />
                        </div>

                        {/* Password with Toggle Icon */}
                        <div className="flex flex-col gap-2 relative">
                            <label htmlFor="password" className="text-sm font-medium text-zinc-600">
                                Password
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-400 transition pr-10"
                            />

                            {/* Eye / EyeSlash Icon */}
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
                            Sign In
                        </button>
                        <p className="text-center">
                            don't have an account ? <Link to='/signup' className="underline text-sky-500 font-semibold">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};
