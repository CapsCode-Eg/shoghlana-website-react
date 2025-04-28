import React, { useState } from 'react'
import Layout from '../../../components/setting/layout';

export default function SocialMedia() {
    const [links, setLinks] = useState({
        LinkedIn: '',
        Facebook: '',
        Twitter: '',
        Behance: '',
        Instagram: '',
        GitHub: '',
        YouTube: '',
        Website: '',
    });

    const handleChange = (platform: string, value: string) => {
        setLinks((prev) => ({ ...prev, [platform]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Saved Links:', links);
    };

    return (
        <Layout>
            <div className=" bg-white  shadow-2xl mb-20 mx-auto px-[28px] py-[42px] rounded-[25px] overflow-hidden w-full">
                <h2 className="text-lg font-bold mb-4">Your Online Presence</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {Object.entries(links).map(([platform, value]) => (
                        <div key={platform} className="flex flex-col lg:flex-row items-start lg:items-center space-x-0 lg:space-x-4">
                            <label className="w-24 font-medium">{platform}</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(platform, e.target.value)}
                                placeholder={`${platform.toLowerCase()}.com/username`}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
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
        </Layout>
    )
}
