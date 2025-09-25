import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState, useMemo } from "react";

export default function Resident() {
    const { residents } = usePage().props;
    const [selected, setSelected] = useState([]);
    const [viewResident, setViewResident] = useState(null);
    const [search, setSearch] = useState("");

    // Filter residents by all fields
    const filteredResidents = useMemo(() => {
        if (!search) return residents;
        const lowerSearch = search.toLowerCase();
        return residents.filter((r) => {
            const valuesToSearch = [
                `${r.first_name} ${r.middle_name} ${r.last_name} ${r.suffix}`,
                r.household?.house_hold_number,
                r.household_number,
                r.relationship_to_head,
                r.date_of_birth,
                r.age,
                r.sex,
                r.civil_status,
                r.occupation,
                r.educational_attainment,
                r.ethnicity,
                r.religion,
                r.f4ps,
                r.f4ps_number,
                r.philhealth_category,
                r.philhealth_number,
                r.medical_history,
                r.family_planning_method_used,
                r.f_p_status_date_started,
            ].filter(Boolean);

            return valuesToSearch.some((val) => val.toString().toLowerCase().includes(lowerSearch));
        });
    }, [search, residents]);

    const toggleSelect = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((s) => s !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const toggleSelectAll = () => {
        if (selected.length === filteredResidents.length) {
            setSelected([]);
        } else {
            setSelected(filteredResidents.map((r) => r.id));
        }
    };


    // Helper function to format field names for display
    const formatFieldName = (key) => {
        return key
            .replace(/_/g, " ")
            .replace(/\b\w/g, l => l.toUpperCase())
            .replace(/F4ps/g, "4Ps")
            .replace(/Philhealth/g, "PhilHealth");
    };

    // Helper function to get appropriate color for relationship
    const getRelationshipColor = (relationship) => {
        if (!relationship) return "bg-gray-100 text-gray-800";
        const rel = relationship.toLowerCase();
        if (rel.includes('head')) return "bg-purple-100 text-purple-800";
        if (rel.includes('spouse') || rel.includes('wife') || rel.includes('husband')) return "bg-pink-100 text-pink-800";
        if (rel.includes('child') || rel.includes('son') || rel.includes('daughter')) return "bg-blue-100 text-blue-800";
        if (rel.includes('parent') || rel.includes('mother') || rel.includes('father')) return "bg-green-100 text-green-800";
        return "bg-gray-100 text-gray-800";
    };

    // Helper function to get sex color
    const getSexColor = (sex) => {
        if (!sex) return "bg-gray-100 text-gray-800";
        const s = sex.toLowerCase();
        if (s === 'male' || s === 'm') return "bg-blue-100 text-blue-800";
        if (s === 'female' || s === 'f') return "bg-pink-100 text-pink-800";
        return "bg-gray-100 text-gray-800";
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-white">
                        👥 Resident Management
                    </h2>
                    <p className="text-violet-100 text-sm mt-1">
                        Manage and view resident information
                    </p>
                </div>
            }
        >
            <Head title="Residents" />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-100 py-8 px-4">
                <div className="mx-auto max-w-7xl space-y-6">
                    {/* Search & Bulk Actions */}


                    {/* Residents Table */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-violet-400 rounded-full mr-3"></div>
                                <h3 className="text-xl font-bold text-white">
                                    Residents Directory
                                </h3>
                                <span className="ml-auto bg-slate-600 text-slate-200 px-3 py-1 rounded-full text-sm font-medium">
                                    {filteredResidents.length} residents
                                </span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-max">
                                <thead>
                                    <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300">
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Household #</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Relationship</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Age</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Sex</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-200">
                                    {filteredResidents.length > 0 ? (
                                        filteredResidents.map((resident, index) => (
                                            <tr
                                                key={resident.id}
                                                className={`hover:bg-gradient-to-r hover:from-violet-50 hover:to-indigo-50 transition-colors duration-150 ${selected.includes(resident.id) ? 'bg-gradient-to-r from-violet-50 to-indigo-50 border-l-4 border-violet-500' : ''
                                                    } ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 flex items-center justify-center">
                                                                <span className="text-sm font-medium text-white">
                                                                    {(resident.first_name?.[0] || '') + (resident.last_name?.[0] || '')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-slate-900">
                                                                {[resident.first_name, resident.middle_name, resident.last_name, resident.suffix]
                                                                    .filter(Boolean)
                                                                    .join(' ')}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        {resident.household?.house_hold_number ?? resident.household_number ?? "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelationshipColor(resident.relationship_to_head)}`}>
                                                        {resident.relationship_to_head ?? "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium text-slate-900">{resident.age ?? "-"}</span>
                                                        {resident.age && (
                                                            <span className="ml-2 text-xs text-slate-500">
                                                                {resident.age < 18 ? "Minor" : "Adult"}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSexColor(resident.sex)}`}>
                                                        {resident.sex ?? "-"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button
                                                        onClick={() => setViewResident(resident)}
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
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center">
                                                    <svg className="w-12 h-12 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    <p className="text-slate-500 text-lg font-medium">No residents found</p>
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

            {/* Enhanced Resident View Modal */}
            {viewResident && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden max-h-[90vh] border border-slate-200">
                        {/* Modal Header */}
                        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-12 w-12 mr-4">
                                        <div className="h-12 w-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                                            <span className="text-lg font-bold text-white">
                                                {(viewResident.first_name?.[0] || '') + (viewResident.last_name?.[0] || '')}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">
                                            {[viewResident.first_name, viewResident.middle_name, viewResident.last_name, viewResident.suffix]
                                                .filter(Boolean)
                                                .join(' ')}
                                        </h3>
                                        <p className="text-violet-100 text-sm mt-1">Resident Information</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setViewResident(null)}
                                    className="text-white hover:text-gray-300 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition duration-200"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
                            {/* Household Information */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 mb-6">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v0M8 5a2 2 0 000 4h8a2 2 0 000-4M8 5v0v0" />
                                    </svg>
                                    <h4 className="text-lg font-semibold text-blue-900">Household Information</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className="text-sm font-medium text-blue-700">Household Number:</span>
                                        <p className="text-blue-900 font-semibold">
                                            {viewResident.household?.house_hold_number ?? viewResident.household_number ?? "Not specified"}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-blue-700">Head of Household:</span>
                                        <p className="text-blue-900 font-semibold">
                                            {viewResident.household?.head_of_household ?? viewResident.head_of_household ?? "Not specified"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Object.entries(viewResident).map(([key, value]) => {
                                    // Skip technical fields and null/undefined values
                                    if (["id", "house_hold_id", "created_at", "updated_at"].includes(key)) return null;
                                    if (value === null || value === undefined || value === "") return null;
                                    if (typeof value === "object") return null; // skip nested objects like household

                                    return (
                                        <div key={key} className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200">
                                            <label className="text-sm font-semibold text-slate-600 uppercase tracking-wide block mb-1">
                                                {formatFieldName(key)}
                                            </label>
                                            <p className="text-slate-900 font-medium break-words">
                                                {key === 'sex' ? (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSexColor(value)}`}>
                                                        {value}
                                                    </span>
                                                ) : key === 'relationship_to_head' ? (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRelationshipColor(value)}`}>
                                                        {value}
                                                    </span>
                                                ) : key.includes('date') ? (
                                                    <span className="text-indigo-700 font-mono text-sm">{value}</span>
                                                ) : key === 'age' ? (
                                                    <span className="text-2xl font-bold text-violet-600">{value}</span>
                                                ) : (
                                                    value
                                                )}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bg-slate-50 px-8 py-4 border-t border-slate-200">
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setViewResident(null)}
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