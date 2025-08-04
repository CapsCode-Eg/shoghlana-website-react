import { Link, useNavigate, useParams } from "react-router";
import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { gradeLevels } from "../../../utils/constant/profile";
import TextArea from "../../../components/common/textArea/textArea";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

export default function ApplicationDetails() {
    const { id } = useParams<{ id?: string }>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>({});
    const [nationalities, setNationalities] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const navigate = useNavigate();

    // Fetch application details
    useEffect(() => {
        if (!id) {
            setError("Application ID is missing");
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [appRes, nationalitiesRes, countriesRes] = await Promise.all([
                    axiosInstance.get(`/company/application-details/${id}`),
                    axiosInstance.get('/nationalities'),
                    axiosInstance.get('/country')
                ]);

                setData(appRes.data?.data || {});
                setNationalities(nationalitiesRes.data?.data || []);
                setCountries(countriesRes.data?.data || []);

                // Fetch cities if seeker data exists
                if (appRes.data?.data?.user_id?.seeker?.country_id) {
                    try {
                        const citiesRes = await axiosInstance.get(
                            `/get-cities-by-country-id/${appRes.data.data.user_id.seeker.country_id}`
                        );
                        setCities(citiesRes.data?.data || []);
                    } catch (citiesError) {
                        console.error("Failed to fetch cities:", citiesError);
                        setCities([]);
                    }
                }
            } catch (err: any) {
                console.error("Error fetching data:", err);
                setError(err?.response?.data?.message || "Failed to load application details");
                toast.error(err?.response?.data?.message || "Failed to load application details");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleConsider = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.get(`/company/consider-application/${id}`);
            toast.success("Application marked as in consideration");
            navigate(-1);
        } catch (err: any) {
            console.error("Error considering application:", err);
            toast.error(err?.response?.data?.message || "Failed to update application status");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.get(`/company/accept-application/${id}`);
            toast.success("Application accepted successfully");
            navigate(-1);
        } catch (err: any) {
            console.error("Error accepting application:", err);
            toast.error(err?.response?.data?.message || "Failed to accept application");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRejected = async () => {
        try {
            setIsLoading(true);
            await axiosInstance.get(`/company/reject-application/${id}`);
            toast.success("Application rejected successfully");
            navigate(-1);
        } catch (err: any) {
            console.error("Error rejecting application:", err);
            toast.error(err?.response?.data?.message || "Failed to reject application");
        } finally {
            setIsLoading(false);
        }
    };

    if (error) {
        return (
            <div className="flex flex-col max-w-screen overflow-hidden pb-4">
                <NavbarTwo />
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-red-500 text-lg mb-4">{error}</div>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="flex flex-col max-w-screen overflow-hidden pb-4">
                <NavbarTwo />
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="text-gray-500 text-lg mb-4">No application data found</div>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Safely access nested properties with fallbacks
    const user = data?.user_id || {};
    const seeker = user?.seeker || {};
    const education = user?.education || {};
    const skills = user?.skills || [];
    const answers = data?.answers || [];

    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="flex flex-col relative">
                <img
                    src="/assets/appFrame.png"
                    alt="Frame Image"
                    className="min-h-[200px]"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/placeholder-image.png';
                    }}
                />
                <div className="flex flex-col bg-white w-[98%] xl:w-[80%] mx-auto -top-30 relative z-[2] rounded-2xl p-5 shadow-xl">
                    <div className="flex flex-row items-center gap-4">
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt="Avatar"
                                className="w-12 h-12 rounded-full"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/assets/default-avatar.png';
                                }}
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                {(user?.first_name?.charAt(0)?.toUpperCase() || '')}
                                {(user?.last_name?.charAt(0)?.toUpperCase() || '')}
                            </div>
                        )}
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center gap-0.5">
                                <Link
                                    to={`/user/${user?.id}`}
                                    className="font-medium text-[18px] text-black"
                                >
                                    {user?.first_name ?
                                        `${user.first_name.charAt(0).toUpperCase()}${user.first_name.slice(1)}` : ''}
                                    {user?.last_name ?
                                        ` ${user.last_name.charAt(0).toUpperCase()}${user.last_name.slice(1)}` : ''}
                                </Link>
                                <span className="text-[14px] text-gray-500">
                                    {seeker?.job_title ?
                                        `(${seeker.job_title.charAt(0).toUpperCase()}${seeker.job_title.slice(1)})` : ''}
                                </span>
                            </div>
                            <span className="text-gray-500 text-sm -mt-1">{user?.email || 'Email not provided'}</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-1 ms-1">
                        <span className="text-sm text-gray-500">Mobile: {user?.mobile || 'Not provided'}</span>
                    </div>

                    <span className="text-sm text-gray-500 mt-1 ms-1">
                        Nationality: {nationalities.find(n => n.id === seeker?.nationality_id)?.name || 'Not specified'}
                    </span>
                    <span className="text-sm text-gray-500 mt-1 ms-1">
                        Location: {cities.find(c => c.id === seeker?.city_id)?.name || 'Not specified'},
                        {countries.find(c => c.id === seeker?.country_id)?.name || 'Not specified'}
                    </span>

                    <div className="flex flex-row flex-wrap items-center mt-1 ms-1">
                        <div className="flex flex-row items-center mt-1 ms-1">
                            <span className="text-sm text-gray-500">
                                {education?.university ?
                                    `${education.university.charAt(0).toUpperCase()}${education.university.slice(1)}` : 'Education not specified'}
                                {education?.field_of_study && (
                                    <>
                                        <span className="mx-1">-</span>
                                        <span className="text-sm text-gray-500">
                                            {education.field_of_study.charAt(0).toUpperCase()}{education.field_of_study.slice(1)}
                                        </span>
                                    </>
                                )}
                                {education?.enroll_year && education?.graduation_year && (
                                    <>
                                        <span className="mx-1">-</span>
                                        <span className="text-sm text-gray-500">
                                            {education.enroll_year} / {education.graduation_year}
                                        </span>
                                    </>
                                )}
                                {education?.grade && (
                                    <>
                                        <span className="mx-1">-</span>
                                        <span className="text-sm text-gray-500">
                                            {gradeLevels[education.grade]?.name || ''}
                                        </span>
                                    </>
                                )}
                            </span>
                        </div>
                        <div className="flex flex-row items-center mt-1 ms-1">
                            <span className="text-sm text-gray-500">{user?.years_of_experience || 0}</span>
                            <span className="mx-1">-</span>
                            <span className="text-sm text-gray-500">Years Of Experience</span>
                        </div>
                    </div>
                    <span className="text-sm text-gray-500 mt-1 ms-1">
                        Skills: {skills.length > 0 ?
                            skills.map((skill: any) => skill.name).join(", ") : 'No skills listed'}
                    </span>
                </div>

                {answers.length > 0 && (
                    <div className="flex flex-col bg-white w-[98%] xl:w-[80%] mx-auto -top-20 relative z-[2] rounded-2xl p-5 shadow-xl">
                        {answers.map((question: any, index: number) => (
                            <div key={question.id || index} className='flex flex-col gap-[7px]'>
                                <span className='text-[15px] text-[#001433] font-bold'>
                                    {question?.question || 'Question not available'}
                                </span>
                                <TextArea
                                    isDisable
                                    value={question?.answer || 'No answer provided'}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-col-reverse gap-4 md:flex-row justify-between items-center bg-white w-[98%] xl:w-[80%] mx-auto -top-10 relative z-[2] rounded-2xl p-5 shadow-xl">
                    <button
                        onClick={() => navigate(-1)}
                        type="button"
                        className="h-[40px] px-[8px] flex items-center justify-center w-full md:w-fit bg-[#EBEDF0] text-[#4D6182] rounded-[8px] hover:bg-[#EBEDF0]/80 transition-colors duration-300"
                    >
                        <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.96226 12.7355L11.1035 11.6395L7.39727 8.07184L11.1035 4.50416L9.96226 3.4082L5.10742 8.07184L9.96226 12.7355Z" fill="#4D6182" />
                        </svg>
                        Cancel
                    </button>
                    <div className="flex flex-row gap-2">
                        <button
                            title="Reject"
                            onClick={handleRejected}
                            type="button"
                            className="h-[40px] px-[8px] text-[13px] text-nowrap md:text-[16px] w-full md:w-fit flex items-center justify-center bg-[#FF3B30] text-white rounded-[8px] hover:bg-[#FF3B30]/80 transition-colors duration-300"
                            disabled={isLoading}
                        >
                            <X />
                        </button>
                        <button
                            title="Accept"
                            onClick={handleAccept}
                            type="button"
                            className="h-[40px] text-[13px] text-nowrap md:text-[16px] px-[8px] w-full md:w-fit flex items-center justify-center bg-green-500 text-white rounded-[8px] hover:bg-[#0055D9]/80 transition-colors duration-300"
                            disabled={isLoading}
                        >
                            <Check />
                        </button>
                        <button
                            onClick={handleConsider}
                            type="button"
                            className="h-[40px] px-[8px] text-[13px] text-nowrap md:text-[16px] w-full md:w-fit flex items-center justify-center bg-yellow-500 text-[white] rounded-[8px] hover:bg-[#597965]/80 transition-colors duration-300"
                            disabled={isLoading}
                        >
                            In Consideration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}