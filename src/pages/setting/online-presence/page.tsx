import React, { useEffect, useState } from 'react'
import Layout from '../../../components/setting/layout';
import InputAndLabel from '../../../components/input/inputAndLabel';
import axiosInstance from '../../../utils/axiosInstance';
import { toast } from 'sonner';

export default function SocialMedia() {
    const [links, setLinks] = useState([
        {
            platform: "linkedin",
            url: ""
        },
        {
            platform: "facebook",
            url: ""
        },
        {
            platform: "snapchat",
            url: ""
        },
        {
            platform: "youtube",
            url: ""
        },
        {
            platform: "instgram",
            url: ""
        },
        {
            platform: "website",
            url: ""
        },
    ]);


    useEffect(() => {
        axiosInstance.get('/user-profile').then((res) => {
            const defaultPlatforms = [
                { platform: "linkedin", url: "" },
                { platform: "facebook", url: "" },
                { platform: "snapchat", url: "" },
                { platform: "youtube", url: "" },
                { platform: "instagram", url: "" },
                { platform: "website", url: "" },
            ];
            const existingSocialMedia = res?.data?.data?.social_media?.map((item: any) => ({ platform: item?.id, url: item?.name })) || [];
            const filledSocialMedia = [
                ...existingSocialMedia,
                ...defaultPlatforms.filter(dp => !existingSocialMedia.some((sm: any) => sm.platform === dp.platform))
            ];
            setLinks(filledSocialMedia)
        })
    }, [])

    const handleArrayChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const updatedSocialMedia = [...links];
        updatedSocialMedia[index] = { ...updatedSocialMedia[index], url: value };

        setLinks(updatedSocialMedia);
    };

    const handleSubmit = () => {
        const newLinkes = links.filter((link) => link.url.trim() !== '');
        axiosInstance.post('/update-social-media', { social_media: newLinkes }).then((res) => {
            const defaultPlatforms = [
                { platform: "linkedin", url: "" },
                { platform: "facebook", url: "" },
                { platform: "snapchat", url: "" },
                { platform: "youtube", url: "" },
                { platform: "instagram", url: "" },
                { platform: "website", url: "" },
            ];
            const existingSocialMedia = res?.data?.data?.social_media?.map((item: any) => ({ platform: item?.id, url: item?.name })) || [];
            const filledSocialMedia = [
                ...existingSocialMedia,
                ...defaultPlatforms.filter(dp => !existingSocialMedia.some((sm: any) => sm.platform === dp.platform))
            ];
            setLinks(filledSocialMedia)
            toast.success('Updated Successfully')
        }).catch((error) => {
            toast.error(error?.response?.data?.message || 'Something went wrong')
        })
    };
    return (
        <Layout>
            <div className=" bg-white  shadow-2xl mb-20 mx-auto px-[28px] py-[42px] rounded-[25px] overflow-hidden w-full">
                <h2 className="text-lg font-bold mb-4">Your Online Presence</h2>
                <div className="flex flex-col items-end gap-4">
                    {
                        links?.map((item: any, index: number) => {

                            return (
                                <InputAndLabel normalChange key={index} label={`${item?.platform} Link`} name={`social_media[${index}].link`} type='text' value={item?.url || ""}
                                    onChange={(e) => handleArrayChange(index, e)}
                                />
                            )
                        })
                    }
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </Layout>
    )
}
