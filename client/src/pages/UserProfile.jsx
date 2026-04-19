import { useState, useRef } from "react";
import { Upload, X, Plus, Check, Loader2, Camera, Menu } from "lucide-react";
import Sidebar from "../components/Sidebar.jsx";

const ALL_TECHS = [
    "JavaScript","TypeScript","Python","Rust","Go","Java","C++","C#","Ruby","Swift","Kotlin",
    "React","Vue","Svelte","Angular","Next.js","Nuxt","Remix","Astro",
    "Node.js","Deno","Express","FastAPI","Django","Rails","Spring","Laravel",
    "PostgreSQL","MySQL","MongoDB","Redis","SQLite","Prisma","Supabase","Firebase",
    "Docker","Kubernetes","AWS","GCP","Azure","Terraform","GitHub Actions",
    "GraphQL","REST","gRPC","tRPC","WebSockets",
    "Tailwind","Figma","Three.js","WebAssembly","Electron","React Native","Flutter",
];

export default function UserProfile() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [name, setName]         = useState("");
    const [handle, setHandle]     = useState("");
    const [bio, setBio]           = useState("");
    const [github, setGithub]     = useState("");
    const [photoUrl, setPhotoUrl] = useState(null);
    const [selected, setSelected] = useState(new Set(["TypeScript","React","Node.js","PostgreSQL"]));
    const [search, setSearch]     = useState("");
    const [focused, setFocused]   = useState("");
    const [saving, setSaving]     = useState(false);
    const [saved, setSaved]       = useState(false);
    const fileRef = useRef(null);

    const initials = name.trim().split(" ").filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join("") || "JD";

    const handlePhoto = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = ev => setPhotoUrl(ev.target.result);
        r.readAsDataURL(f);
    };

    const addTag    = t => setSelected(p => new Set([...p, t]));
    const removeTag = t => setSelected(p => { const n = new Set(p); n.delete(t); return n; });

    const suggestions = ALL_TECHS
        .filter(t => !selected.has(t) && t.toLowerCase().includes(search.toLowerCase()))
        .slice(0, 20);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(r => setTimeout(r, 1600));
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        console.log(name, handle, bio, github, photoUrl, selected);
    };

    const inputCls = (name) =>
        `w-full rounded-2xl px-5 py-4 text-base outline-none transition-all duration-200 text-[#2c1f0e] placeholder-[#c4b09a] ${
            focused === name
                ? "bg-white border border-[#c9a96e] shadow-[0_0_0_4px_rgba(201,169,110,0.15)]"
                : "bg-[#f0e9de] border border-transparent"
        }`;

    return (
        <div className="min-h-screen bg-[#f5f0e8] md:flex">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="relative overflow-hidden flex-1">

            <div className="relative z-20 md:hidden p-4 pb-0">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#fdf8f2] px-3 py-2 text-sm font-medium text-[#3b2e1e] border border-[rgba(180,155,115,0.2)]"
                >
                    <Menu size={16} />
                    Menu
                </button>
            </div>

            {/* Ambient blobs */}
            <div className="absolute top-[-8%] right-[-6%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,#e8d9c0_0%,transparent_70%)] opacity-90 pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-8%] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,#ddd0b8_0%,transparent_70%)] opacity-70 pointer-events-none" />
            <div className="absolute top-[38%] left-[5%] w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,#ede3d1_0%,transparent_70%)] opacity-60 pointer-events-none" />

            {/* Main */}
            <div className="relative z-10 max-w-2xl mx-auto px-4 py-10 pb-16">

                {/* Page heading */}
                <div className="mb-8 px-1">
                    <h1 className="font-bold text-3xl text-[#2c1f0e] mb-1">Your Profile</h1>
                    <p className="text-[#9a8570] text-base">How other developers see you on Prism</p>
                </div>

                {/* Card */}
                <div className="rounded-3xl bg-[#fdf8f2] border border-[rgba(180,155,115,0.2)] shadow-[0_8px_64px_rgba(120,90,50,0.12),0_2px_16px_rgba(120,90,50,0.07)] overflow-hidden">

                    {/* Hero band */}
                    <div className="h-24 bg-gradient-to-r from-[#c9a96e] to-[#a07840] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,#fff_0%,transparent_60%)]" />
                        <div className="absolute bottom-0 right-8 opacity-10 text-[120px] font-black text-white leading-none select-none">{`{}`}</div>
                    </div>

                    <div className="px-8 pb-8">

                        {/* Avatar + upload button row */}
                        <div className="flex items-end justify-between -mt-12 mb-8">
                            <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
                                <div
                                    className="w-24 h-24 rounded-2xl border-4 border-[#fdf8f2] overflow-hidden shadow-[0_4px_20px_rgba(120,90,50,0.18)]"
                                    style={{ background: "linear-gradient(135deg,#e8d9c0 0%,#c9a96e 100%)" }}
                                >
                                    {photoUrl
                                        ? <img src={photoUrl} alt="avatar" className="w-full h-full object-cover" />
                                        : <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[#7a5220]">{initials}</div>
                                    }
                                </div>
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 rounded-[12px] flex items-center justify-center transition-opacity">
                                    <Camera size={20} className="text-white" />
                                </div>
                            </div>
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />

                            <button
                                onClick={() => fileRef.current?.click()}
                                className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-2xl border border-[rgba(180,155,115,0.35)] text-[#a07840] bg-white/70 hover:bg-[#fdf3e4] transition-all"
                            >
                                <Upload size={14} />
                                Upload photo
                            </button>
                        </div>

                        {/* Name & handle */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            <div>
                                <label className="block text-xs font-semibold mb-2.5 text-[#8a7560] tracking-wider">FULL NAME</label>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="Jane Doe"
                                    onChange={e => setName(e.target.value)}
                                    onFocus={() => setFocused("name")}
                                    onBlur={() => setFocused("")}
                                    className={inputCls("name")}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold mb-2.5 text-[#8a7560] tracking-wider">DISPLAY HANDLE</label>
                                <input
                                    type="text"
                                    value={handle}
                                    placeholder="@janedoe"
                                    onChange={e => setHandle(e.target.value)}
                                    onFocus={() => setFocused("handle")}
                                    onBlur={() => setFocused("")}
                                    className={inputCls("handle")}
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="mb-5">
                            <label className="block text-xs font-semibold mb-2.5 text-[#8a7560] tracking-wider">BIO</label>
                            <textarea
                                value={bio}
                                placeholder="I build things for the web. Currently obsessed with distributed systems and Rust."
                                maxLength={200}
                                rows={3}
                                onChange={e => setBio(e.target.value)}
                                onFocus={() => setFocused("bio")}
                                onBlur={() => setFocused("")}
                                className={`${inputCls("bio")} resize-none leading-relaxed`}
                            />
                            <div className="text-right text-xs text-[#b5a08a] mt-1.5 font-medium">{bio.length} / 200</div>
                        </div>

                        {/* GitHub */}
                        <div className="mb-8">
                            <label className="block text-xs font-semibold mb-2.5 text-[#8a7560] tracking-wider">GITHUB</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                                    <span className="text-sm text-[#b5a08a]">github.com /</span>
                                </div>
                                <input
                                    type="text"
                                    value={github}
                                    placeholder="janedoe"
                                    onChange={e => setGithub(e.target.value)}
                                    onFocus={() => setFocused("github")}
                                    onBlur={() => setFocused("")}
                                    className={`${inputCls("github")} pl-[152px]`}
                                />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[rgba(180,155,115,0.2)] mb-7" />

                        {/* Tech stack */}
                        <div className="mb-8">
                            <label className="block text-xs font-semibold mb-3 text-[#8a7560] tracking-wider">TECH STACK</label>

                            {/* Selected tags */}
                            {selected.size > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {[...selected].map(t => (
                                        <span
                                            key={t}
                                            onClick={() => removeTag(t)}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl cursor-pointer select-none
                        bg-[#f5ead6] text-[#7a5220] border border-[#c9a96e]/40
                        hover:bg-[#fdefd9] hover:border-[#c9a96e] transition-all"
                                        >
                      {t}
                                            <X size={11} className="opacity-50" />
                    </span>
                                    ))}
                                </div>
                            )}

                            {/* Search input */}
                            <div className="relative mb-3">
                                <Plus size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b5a08a] pointer-events-none" />
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search languages, frameworks, tools..."
                                    onChange={e => setSearch(e.target.value)}
                                    onFocus={() => setFocused("search")}
                                    onBlur={() => setFocused("")}
                                    className={`${inputCls("search")} pl-10 text-sm`}
                                />
                            </div>

                            {/* Suggestion chips */}
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map(t => (
                                    <span
                                        key={t}
                                        onClick={() => addTag(t)}
                                        className="inline-flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-xl cursor-pointer
                      bg-[#f0e9de] text-[#8a7560] border border-transparent
                      hover:bg-[#fdf3e4] hover:text-[#a07840] hover:border-[#c9a96e]/40 transition-all"
                                    >
                    <Plus size={10} className="opacity-40" />
                                        {t}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[rgba(180,155,115,0.2)] mb-7" />

                        {/* Save row */}
                        <div className="flex items-center justify-between gap-4">
              <span className={`text-sm transition-colors duration-300 ${saved ? "text-emerald-600 font-semibold" : "text-[#b5a08a]"}`}>
                {saved ? "✓ Profile saved successfully!" : "Unsaved changes"}
              </span>

                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-white transition-all duration-200 ${
                                    saving
                                        ? "bg-[#c9a96e] cursor-not-allowed"
                                        : "bg-gradient-to-br from-[#c9a96e] to-[#a07840] shadow-[0_4px_24px_rgba(160,120,64,0.35)] hover:shadow-[0_8px_32px_rgba(160,120,64,0.45)] hover:-translate-y-[1px]"
                                }`}
                            >
                                {saving ? (
                                    <><Loader2 size={17} className="animate-spin" /> Saving...</>
                                ) : saved ? (
                                    <><Check size={17} /> Saved</>
                                ) : (
                                    "Save profile"
                                )}
                            </button>
                        </div>

                    </div>
                </div>

                <p className="text-center text-sm text-[#b5a08a] mt-6">
                    Your profile is visible to other developers on Prism
                </p>
            </div>
            </main>
        </div>
    );
}