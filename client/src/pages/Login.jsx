import { useState } from "react";
import { Eye, EyeOff, Loader2, AlertCircle, Check } from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focused, setFocused] = useState("");
    const [remember, setRemember] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1800));
        setLoading(false);
        setError("Invalid credentials. Please try again.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-[#f5f0e8] relative overflow-hidden">

            {/* blobs */}
            <div className="absolute top-[-8%] right-[-6%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,#e8d9c0_0%,transparent_70%)] opacity-90" />
            <div className="absolute bottom-[-10%] left-[-8%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,#ddd0b8_0%,transparent_70%)] opacity-70" />
            <div className="absolute top-[38%] left-[5%] w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,#ede3d1_0%,transparent_70%)] opacity-60" />

            <div className="relative w-full max-w-md z-10">
                <div className="rounded-3xl px-10 py-12 bg-[#fdf8f2] border border-[rgba(180,155,115,0.2)] shadow-[0_8px_64px_rgba(120,90,50,0.12),0_2px_16px_rgba(120,90,50,0.07)]">

                    {/* logo */}
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#c9a96e] to-[#a07840]">
                            <div className="w-4 h-4 bg-white rotate-45" />
                        </div>
                        <span className="font-bold text-xl text-[#3b2e1e]">Prism</span>
                    </div>

                    <h1 className="font-bold text-3xl mb-2 text-[#2c1f0e]">
                        Welcome back
                    </h1>
                    <p className="text-base mb-9 text-[#9a8570]">
                        Sign in to your account to continue
                    </p>

                    {/* error */}
                    {error && (
                        <div className="mb-6 rounded-2xl px-5 py-4 text-sm flex items-center gap-3 bg-[#fdeaea] border border-[#f5c0c0] text-[#a83232]">
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* email */}
                        <div className="mb-5">
                            <label className="block text-xs font-semibold mb-2.5 text-[#8a7560] tracking-wider">
                                EMAIL ADDRESS
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setFocused("email")}
                                onBlur={() => setFocused("")}
                                placeholder="you@company.com"
                                className={`w-full rounded-2xl px-5 py-4 text-base outline-none transition ${
                                    focused === "email"
                                        ? "bg-white border border-[#c9a96e] shadow-[0_0_0_4px_rgba(201,169,110,0.15)]"
                                        : "bg-[#f0e9de]"
                                }`}
                            />
                        </div>

                        {/* password */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2.5">
                                <label className="text-xs font-semibold text-[#8a7560] tracking-wider">
                                    PASSWORD
                                </label>
                                <button
                                    type="button"
                                    className="text-sm font-medium text-[#a07840] hover:text-[#c9a96e]"
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused("password")}
                                    onBlur={() => setFocused("")}
                                    placeholder="••••••••"
                                    className={`w-full rounded-2xl px-5 py-4 pr-12 text-base outline-none transition ${
                                        focused === "password"
                                            ? "bg-white border border-[#c9a96e] shadow-[0_0_0_4px_rgba(201,169,110,0.15)]"
                                            : "bg-[#f0e9de]"
                                    }`}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b5a08a] hover:text-[#a07840]"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* remember */}
                        <div className="flex items-center gap-3 mb-8">
                            <button
                                type="button"
                                onClick={() => setRemember(!remember)}
                                className={`w-5 h-5 rounded-md flex items-center justify-center transition ${
                                    remember
                                        ? "bg-[#a07840] border border-[#a07840] shadow-[0_0_0_3px_rgba(160,120,64,0.15)]"
                                        : "bg-[#f0e9de] border border-[#c9b899]"
                                }`}
                            >
                                {remember && <Check size={12} className="text-white" />}
                            </button>

                            <span className="text-sm text-[#8a7560]">
                Remember me for 30 days
              </span>
                        </div>

                        {/* submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-2xl text-base font-semibold text-white flex items-center justify-center gap-2 transition ${
                                loading
                                    ? "bg-[#c9a96e] cursor-not-allowed"
                                    : "bg-gradient-to-br from-[#c9a96e] to-[#a07840] shadow-[0_4px_24px_rgba(160,120,64,0.35)] hover:shadow-[0_8px_32px_rgba(160,120,64,0.45)] hover:-translate-y-[1px]"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-8 text-[#9a8570]">
                        Don't have an account?{" "}
                        <button onClick={()=>navigate("/register")} className="font-semibold text-[#a07840] hover:text-[#c9a96e]">
                            Create one free
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}