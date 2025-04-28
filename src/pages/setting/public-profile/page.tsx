
import React, { useState } from 'react'
import Layout from '../../../components/setting/layout';
import InputAndLabel from '../../../components/input/inputAndLabel';

export default function PublicProfile() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        newEmail: '',
        confirmEmail: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved Data:', formData);
    };

    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Account deleted');
        }
    };

    return (
        <Layout>
            <div className=" bg-white  shadow-2xl mb-20 mx-auto px-[28px] py-[42px] rounded-[25px] overflow-hidden w-full">
                {/* Public Profile Settings */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Public Profile Settings</h2>
                    <form onSubmit={handleSaveChanges} className="space-y-4">
                        {[
                            { label: 'Current Password', name: 'currentPassword' },
                            { label: 'New Password', name: 'newPassword' },
                            { label: 'Confirm Password', name: 'confirmPassword' },
                            { label: 'New Email', name: 'newEmail' },
                            { label: 'Confirm Email', name: 'confirmEmail' },
                        ].map(({ label, name }) => (
                            <div key={name} className="flex flex-col xl:flex-row items-start xl:items-center space-x-4">
                                <InputAndLabel label={label} placeholder={label} type={name === 'currentPassword' || name === 'confirmPassword' || name === 'newPassword' ? 'password' : 'text'} see={name === 'currentPassword' || name === 'confirmPassword' || name === 'newPassword' ? true : false} name={name} onChange={handleChange} />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Delete Account */}
                <div className="p-4 mt-10 bg-red-50 border border-red-200 rounded-lg">
                    <h2 className="text-lg font-bold text-red-600">Delete My Account</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        If you are deleting your profile just because you do not want employers to see your profile, you can just hide your profile through the above section.
                    </p>
                    <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        Delete My Account
                    </button>
                </div>
            </div>
        </Layout>
    )
}
