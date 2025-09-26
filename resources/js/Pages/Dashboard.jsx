import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const { users, households, residents } = usePage().props;
    const [showModal, setShowModal] = useState(false);

    const form = useForm({
        name: '',
        email: '',
        role: 'staff',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('users.store'), {
            onSuccess: () => {
                setShowModal(false);
                form.reset();
            },
        });
    };

    // Helper function to get role color
    const getRoleColor = (role) => {
        if (!role) return "bg-gray-100 text-gray-800";
        const r = role.toLowerCase();
        if (r === 'admin') return "bg-red-100 text-red-800";
        if (r === 'staff') return "bg-blue-100 text-blue-800";
        if (r === 'supervisor') return "bg-purple-100 text-purple-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-white">
                        📊 Dashboard
                    </h2>
                    <p className="text-emerald-100 text-sm mt-1">
                        System overview and user management
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 py-8 px-4 space-y-8">
                {/* Enhanced Statistics Widgets */}
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Households Widget */}
                        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full -mr-16 -mt-16 opacity-10"></div>
                            <div className="relative p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-slate-600 font-medium text-sm uppercase tracking-wide">Total Households</h3>
                                        <span className="text-4xl font-bold text-slate-800 mt-2 block">{households.length}</span>
                                        <p className="text-sm text-slate-500 mt-1">Registered families</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0M8 5a2 2 0 000 4h8a2 2 0 000-4M8 5v0v0" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Users Widget */}
                        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full -mr-16 -mt-16 opacity-10"></div>
                            <div className="relative p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-slate-600 font-medium text-sm uppercase tracking-wide">System Users</h3>
                                        <span className="text-4xl font-bold text-slate-800 mt-2 block">{users.length}</span>
                                        <p className="text-sm text-slate-500 mt-1">Staff members</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Residents Widget */}
                        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full -mr-16 -mt-16 opacity-10"></div>
                            <div className="relative p-8">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-slate-600 font-medium text-sm uppercase tracking-wide">Total Residents</h3>
                                        <span className="text-4xl font-bold text-slate-800 mt-2 block">{residents.length}</span>
                                        <p className="text-sm text-slate-500 mt-1">Community members</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex items-center">
                                        <div className="w-full bg-slate-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full" style={{ width: `${Math.min(100, (residents.length / 5000) * 100)}%` }}></div>
                                        </div>
                                        <span className="text-xs text-slate-500 ml-2">Registered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Users Table */}
                <div className="mx-auto max-w-7xl">
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        {/* Table Header */}
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-8 py-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                                    <h3 className="text-xl font-bold text-white">System Users</h3>
                                    <span className="ml-4 bg-slate-600 text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                                        {users.length} users
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 shadow-lg"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Staff
                                </button>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300">
                                        <th className="px-8 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">User</th>
                                        <th className="px-8 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Email</th>
                                        <th className="px-8 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {users.map((user, index) => (
                                        <tr
                                            key={user.id}
                                            className={`hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                                                }`}
                                        >

                                            <td className="px-8 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                                                            <span className="text-sm font-medium text-white">
                                                                {user.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-slate-900">{user.name}</div>
                                                        <div className="text-sm text-slate-500">Staff Member</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="text-sm text-slate-900">{user.email}</div>
                                                <div className="text-sm text-slate-500">Contact information</div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                                                    {user.role || 'staff'}
                                                </span>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Enhanced Add Staff Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Add New Staff</h3>
                                        <p className="text-emerald-100 text-sm mt-1">Create a new user account</p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-white hover:text-gray-300 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={submit} className="p-8 space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            value={form.data.name}
                                            onChange={(e) => form.setData('name', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                                            placeholder="Enter full name"
                                            required
                                        />
                                    </div>
                                    {form.errors.name && <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) => form.setData('email', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                                            placeholder="Enter email address"
                                            required
                                        />
                                    </div>
                                    {form.errors.email && <p className="mt-2 text-sm text-red-600">{form.errors.email}</p>}
                                </div>

                                <input type="hidden" value={form.data.role} />

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            value={form.data.password}
                                            onChange={(e) => form.setData('password', e.target.value)}
                                            className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200"
                                            placeholder="Enter secure password"
                                            required
                                        />
                                    </div>
                                    {form.errors.password && <p className="mt-2 text-sm text-red-600">{form.errors.password}</p>}
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm text-slate-600">This user will be created with <span className="font-semibold text-blue-600">Staff</span> role privileges.</span>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-200 font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={form.processing}
                                    >
                                        {form.processing ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add Staff
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}