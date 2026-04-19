import { useState } from "react";
import {
    Eye,
    EyeOff,
    Loader2,
    Check,
} from "lucide-react";
import {useNavigate} from "react-router-dom";

const getStrength = (pw) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
};

const strengthMap = {
    0: { label: "", width: "w-0", color: "bg-transparent" },
    1: { label: "Weak", width: "w-1/4", color: "bg-red-400" },
    2: { label: "Fair", width: "w-2/4", color: "bg-yellow-500" },
    3: { label: "Good", width: "w-3/4", color: "bg-green-400" },
    4: { label: "Strong", width: "w-full", color: "bg-green-600" },
};

export default function Register() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirm: "",
    });

    const [show, setShow] = useState({
        password: false,
        confirm: false,
    });

    const [focused, setFocused] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const strength = getStrength(form.password);
    const strengthInfo = strengthMap[strength];

    const set = (field) => (e) => {
        setForm((f) => ({ ...f, [field]: e.target.value }));
        setErrors((er) => ({ ...er, [field]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Full name is required.";
        if (!form.email.trim()) e.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(form.email))
            e.email = "Enter a valid email.";
        if (!form.password) e.password = "Password is required.";
        else if (form.password.length < 8)
            e.password = "Must be at least 8 characters.";
        if (!form.confirm) e.confirm = "Confirm your password.";
        else if (form.confirm !== form.password)
            e.confirm = "Passwords do not match.";
        if (!agreed) e.agreed = "Accept terms.";
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) return setErrors(errs);

        setErrors({});
        console.log("Form data:", form);
    };

    const inputClass = (field) =>
        `w-full rounded-2xl px-5 py-4 text-base outline-none transition ${
            errors[field]
                ? "border border-red-400 shadow-[0_0_0_4px_rgba(224,112,112,0.12)] bg-white"
                : focused === field
                    ? "bg-white border border-[#c9a96e] shadow-[0_0_0_4px_rgba(201,169,110,0.15)]"
                    : "bg-[#f0e9de]"
        }`;

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f0e8] px-4">
                <div className="bg-[#fdf8f2] p-10 rounded-3xl text-center shadow-xl max-w-md w-full">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#a07840] flex items-center justify-center">
                        <Check className="text-white" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Account created</h2>
                    <p className="text-[#9a8570] mb-6">
                        Welcome {form.name.split(" ")[0]}
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 rounded-xl text-white bg-gradient-to-br from-[#c9a96e] to-[#a07840]"
                    >
                        Back to login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  relative overflow-hidden flex items-center justify-center px-4 py-10 bg-[#f5f0e8]">
            <div className="w-full  overflow-hidden max-w-md bg-[#fdf8f2] rounded-3xl px-10 py-12 shadow-xl">

                <div className="absolute top-[-8%] right-[-6%] w-130 h-130 rounded-full bg-[radial-gradient(circle,#e8d9c0_0%,transparent_70%)] opacity-90" />
                <div className="absolute bottom-[-10%] left-[-8%] w-120 h-120 rounded-full bg-[radial-gradient(circle,#ddd0b8_0%,transparent_70%)] opacity-70" />
                <div className="absolute top-[38%] left-[5%] w-65 h-65 rounded-full bg-[radial-gradient(circle,#ede3d1_0%,transparent_70%)] opacity-60" />



                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#c9a96e] to-[#a07840]">
                        <div className="w-4 h-4 bg-white rotate-45" />
                    </div>
                    <span className="font-bold text-xl text-[#3b2e1e]">Prism</span>
                </div>

                <h1 className="font-bold text-3xl mb-2 text-[#2c1f0e]">
                    Welcome user
                </h1>
                <p className="text-base mb-9 text-[#9a8570]">
                    Sign up  your account to continue
                </p>

                <form onSubmit={handleSubmit}>
                    {/* name */}
                    <div className="mb-4">
                        <input
                            placeholder="Full name"
                            value={form.name}
                            onChange={set("name")}
                            onFocus={() => setFocused("name")}
                            onBlur={() => setFocused("")}
                            className={inputClass("name")}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    {/* email */}
                    <div className="mb-4">
                        <input
                            placeholder="Email"
                            value={form.email}
                            onChange={set("email")}
                            onFocus={() => setFocused("email")}
                            onBlur={() => setFocused("")}
                            className={inputClass("email")}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    {/* password */}
                    <div className="mb-3 relative">
                        <input
                            type={show.password ? "text" : "password"}
                            placeholder="Password"
                            value={form.password}
                            onChange={set("password")}
                            onFocus={() => setFocused("password")}
                            onBlur={() => setFocused("")}
                            className={`${inputClass("password")} pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShow((s) => ({ ...s, password: !s.password }))
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {show.password ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    {/* strength */}
                    {form.password && (
                        <div className="mb-4">
                            <div className="flex justify-between text-xs mb-1">
                                <span>Password strength</span>
                                <span>{strengthInfo.label}</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                                <div className={`h-1.5 rounded-full ${strengthInfo.width} ${strengthInfo.color}`} />
                            </div>
                        </div>
                    )}

                    {/* confirm */}
                    <div className="mb-4 relative">
                        <input
                            type={show.confirm ? "text" : "password"}
                            placeholder="Confirm password"
                            value={form.confirm}
                            onChange={set("confirm")}
                            onFocus={() => setFocused("confirm")}
                            onBlur={() => setFocused("")}
                            className={`${inputClass("confirm")} pr-12`}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                setShow((s) => ({ ...s, confirm: !s.confirm }))
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>

                        {form.confirm && form.confirm === form.password && (
                            <Check className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                        )}
                    </div>

                    {/* terms */}
                    <div className="mb-2">
                        <label className="flex items-start gap-2 text-sm text-[#6f5a43]">
                            <input
                                type="checkbox"
                                checked={agreed}
                                onChange={(e) => {
                                    setAgreed(e.target.checked);
                                    setErrors((er) => ({ ...er, agreed: "" }));
                                }}
                                className="mt-1"
                            />
                            <span>I agree to the terms and conditions.</span>
                        </label>
                        {errors.agreed && <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>}
                    </div>

                    <div className="flex items-center gap-2 mb-6">
                        <p className="text-center text-sm mt-8 text-[#9a8570]">
                            Already have  an account?{" "}
                            <button type="button" onClick={()=>navigate("/login")} className="font-semibold text-[#a07840] hover:text-[#c9a96e]">
                                Sign in
                            </button>
                        </p>
                    </div>



                    {/* submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 cursor-pointer rounded-2xl text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-br from-[#c9a96e] to-[#a07840]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Creating...
                            </>
                        ) : (
                            "Create account"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}