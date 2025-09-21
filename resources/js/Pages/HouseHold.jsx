
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState, useRef } from "react";

export default function HouseHold() {
    const { households } = usePage().props;
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewHousehold, setViewHousehold] = useState(null); // ✅ For modal

    const toggleSelect = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selected.length === households.length) {
            setSelected([]);
        } else {
            setSelected(households.map((h) => h.id));
        }
    };

    const filteredHouseholds = households.filter((h) => {
        const term = searchTerm.toLowerCase();
        return (
            h.house_hold_number?.toLowerCase().includes(term) ||
            h.head_of_household?.toLowerCase().includes(term) ||
            h.purok?.name?.toLowerCase().includes(term) ||
            h.purok?.toLowerCase?.()?.includes(term)
        );
    });

    const handlePrint = () => {
        if (selected.length === 0) {
            alert("Please select at least one household to print.");
            return;
        }
        // ...existing print logic
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-white">
                        🏠 Household Management
                    </h2>
                    <p className="text-indigo-100 text-sm mt-1">
                        Manage and view household information
                    </p>
                </div>
            }
        >
            <Head title="Households" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
                <div className="mx-auto max-w-8xl space-y-6">
                    {/* Search + Bulk Actions */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
                        <div className="flex justify-between items-center">
                            <div className="relative flex-1 max-w-md">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search households..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                                />
                            </div>
                            {selected.length > 0 && (
                                <div className="ml-4 flex items-center space-x-3">
                                    <span className="text-sm font-medium text-slate-600">
                                        {selected.length} selected
                                    </span>
                                    <button
                                        onClick={handlePrint}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 shadow-lg"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        Print Selected
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Households Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                                <h3 className="text-xl font-bold text-white">
                                    Households Directory
                                </h3>
                                <span className="ml-auto bg-slate-600 text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                                    {filteredHouseholds.length} households
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300">
                                        <th className="px-6 py-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selected.length === filteredHouseholds.length && filteredHouseholds.length > 0}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                            />
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Household #</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Head of Household</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Purok</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Date of Visit</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Water Source</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Facility Type</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Garden</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Income</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">MRF</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredHouseholds.length > 0 ? (
                                        filteredHouseholds.map((household, index) => (
                                            <tr
                                                key={household.id}
                                                className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-colors duration-150 ${selected.includes(household.id) ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500' : ''
                                                    } ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                                            >
                                                <td className="px-6 py-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={selected.includes(household.id)}
                                                        onChange={() => toggleSelect(household.id)}
                                                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-900">{household.house_hold_number ?? "-"}</td>
                                                <td className="px-6 py-4 text-slate-700">{household.head_of_household ?? "-"}</td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {household.purok?.name ?? household.purok ?? "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600">{household.date_of_visit ?? "-"}</td>
                                                <td className="px-6 py-4 text-slate-600">{household.type_of_water_source ?? "-"}</td>
                                                <td className="px-6 py-4 text-slate-600">{household.type_of_facility ?? "-"}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${household.back_yard_garden === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {household.back_yard_garden ?? "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-slate-900">{household.household_income ?? "-"}</td>
                                                <td className="px-6 py-4 text-slate-600">{household.mrf ?? "-"}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => setViewHousehold(household)}
                                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition duration-200 shadow-sm"
                                                    >
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="11"
                                                className="px-6 py-12 text-center"
                                            >
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                    <p className="text-slate-500 text-lg font-medium">No households found</p>
                                                    <p className="text-slate-400 text-sm">Try adjusting your search criteria</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Household Modal */}
            {viewHousehold && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] border border-slate-200">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Household Details</h3>
                                    <p className="text-indigo-100 text-sm mt-1">Complete household information</p>
                                </div>
                                <button
                                    onClick={() => setViewHousehold(null)}
                                    className="text-white hover:text-gray-300 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Household Number</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.house_hold_number || "Not specified"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Head of Household</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.head_of_household || "Not specified"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Purok</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {viewHousehold.purok?.name ?? viewHousehold.purok ?? "Not specified"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Date of Visit</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.date_of_visit || "Not specified"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Number of Members</label>
                                        <p className="text-2xl font-bold text-indigo-600 mt-1">{viewHousehold.residents?.length ?? 0}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Water Source</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.type_of_water_source || "Not specified"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Facility Type</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.type_of_facility || "Not specified"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Backyard Garden</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${viewHousehold.back_yard_garden === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {viewHousehold.back_yard_garden || "Not specified"}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Household Income</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.household_income || "Not specified"}</p>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                        <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide">MRF</label>
                                        <p className="text-lg font-medium text-slate-900 mt-1">{viewHousehold.mrf || "Not specified"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setViewHousehold(null)}
                                    className="px-6 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition duration-200 font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}