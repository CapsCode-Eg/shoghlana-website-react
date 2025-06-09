
import { useState } from 'react'
import Layout from '../../../components/setting/layout';
import InputAndLabel from '../../../components/input/inputAndLabel';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'sonner';
import { changePasswordSchema } from './validation/passwordValidation';

export default function PublicProfile() {
    const [formData, setFormData] = useState({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState<any>({});

    const handleSaveChanges = async () => {
        setErrors({});
        try {
            await changePasswordSchema.validate(formData, { abortEarly: false });
            axiosInstance.post('/update-password', formData).then(() => {
                setFormData({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                });

                toast.success('Password changed successfully');
                setTimeout(() => {
                    localStorage.clear();
                    window.location.href = '/';
                }, 2000);
            }).catch((err) => {
                toast.error(err?.response?.data?.message || 'Something went wrong');
            })
        } catch (err: any) {
            if (err.inner) {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
        };
    }
    const handleDeleteAccount = () => {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            axiosInstance.post('/delete-account').then(() => {
                window.localStorage.clear();
                window.location.href = '/';
            }).catch(() => {
                toast.error('Failed to delete account');
            })
        }
    };

    return (
        <Layout>
            <div className=" bg-white  shadow-2xl mb-20 mx-auto px-[28px] py-[42px] rounded-[25px] overflow-hidden w-full">
                {/* Public Profile Settings */}
                <div>
                    <h2 className="text-lg font-bold mb-4">Public Profile Settings</h2>
                    <div className="flex flex-col items-end gap-4 justify-end">
                        <InputAndLabel
                            label="Current Password"
                            name="current_password"
                            type="password"
                            value={formData.current_password}
                            setData={setFormData}
                            error={errors.current_password}
                            see
                        />
                        <InputAndLabel
                            label="New Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            setData={setFormData}
                            error={errors.password}
                            see
                        />
                        <InputAndLabel
                            label="Confirm New Password"
                            name="password_confirmation"
                            type="password"
                            value={formData.password_confirmation}
                            setData={setFormData}
                            error={errors.password_confirmation}
                            see
                        />
                        <button
                            type="button"
                            onClick={handleSaveChanges}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            Save Changes
                        </button>
                    </div>
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
