
export default function LandingPage() {


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 flex flex-col items-center justify-center text-center relative overflow-x-hidden">
            {/* Hero Section */}
            <div className="max-w-3xl px-4">
                <h1 className="text-5xl font-bold text-slate-800 mb-6">
                    Welcome to the{" "}
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Household Management System
                    </span>
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                    Manage households, residents, and reports efficiently with our
                    digital solution.
                </p>
                <div className="flex justify-center gap-6">
                    <a
                        href="/staff/login"
                        className="px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
                    >
                        Login as Staff
                    </a>
                    <a
                        href="/login"
                        className="px-8 py-4 bg-violet-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-200 shadow-lg"
                    >
                        Login as Admin
                    </a>
                </div>
            </div>


        </div>
    );
}