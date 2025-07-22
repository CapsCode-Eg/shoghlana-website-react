import React from 'react';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    type: string;
    cv: string;
    status: boolean;
}

interface UserData {
    id: number;
    status: number;
    user: User;
}

interface UsersTableProps {
    data: UserData[];
    isLoading?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ data, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                <p className="mt-1 text-sm text-gray-500">There are currently no users to display.</p>
            </div>
        );
    }
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm  mt-6 mx-2">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CV</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.length > 0 && data?.map((item) => (
                        <tr key={item.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.user.first_name} {item.user.last_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user.mobile}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.user.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.user.cv ? (
                                    <a
                                        href={item.user.cv}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                        View CV
                                    </a>
                                ) : (
                                    'N/A'
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <span
                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {item.user.status ? 'Active' : 'Inactive'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;