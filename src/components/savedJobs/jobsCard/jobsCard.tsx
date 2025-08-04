import { Link } from "react-router";
import { LEVELS, PLACES, TYPES } from "../../../utils/constant/job";
import { useEffect, useState } from "react";
import { Edit, Eye, Trash2, Bookmark, BookmarkCheck, Star, X } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "sonner";

export default function JobsCard({ isDone, isAccepted, job, handleDelete, noActrions }: { handleDelete?: (id: number) => void, job?: any, noActrions?: boolean, isDone?: boolean, isAccepted?: boolean }) {
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, [])
    const [data, setData] = useState<any>({});
    useEffect(() => {
        if (job) {
            setData(job);
        }
    }, [job])

    const handleSaveJob = () => {
        axiosInstance.post('/saved-jobs', { company_job_id: job?.id }).then(() => {
            toast.success('Job saved successfully')
            setData((prevData: any) => ({
                ...prevData,
                is_saved: true
            }))
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
            return err;
        })
    }
    console.log(job)
    return (
        <div className="w-full relative bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow px-6 pt-5 pb-6 flex flex-col min-h-[150px]">
            {/* Header section */}
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                        <Link to={`/job/${job?.id}/view`}>{job?.title || 'Loading'}</Link>
                    </h2>
                    <div className="flex items-center mt-1 space-x-2">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                            {TYPES.find((type) => type.id == job?.post_type)?.name || 'Loading'}
                        </span>
                        <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
                            {PLACES.find((place) => place.id == job?.work_place)?.name || 'Loading'}
                        </span>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                    {job?.applications !== null && userData?.type !== 'company' && (
                        <button className="flex items-center  text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                            <Star className="w-4 h-4 mr-1.5 fill-current" />
                            {job?.applications?.status?.charAt(0)?.toUpperCase() + job?.applications?.status.slice(1) || 'Loading'}
                        </button>
                    )}
                    {userData?.type !== 'company' && window.localStorage.getItem("user") && (
                        <button
                            onClick={() => {
                                if (job.is_saved) {
                                    axiosInstance.delete(`/saved-jobs/${job?.id}`).then(() => {
                                        toast.success('Job unsaved successfully')
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            is_saved: false
                                        }))
                                    }).catch((err) => {
                                        toast.error(err?.response?.data?.message, { id: 'add-country' })
                                        return err;
                                    })
                                } else {
                                    handleSaveJob()
                                }
                            }}
                            className={`p-2 rounded-lg ${data?.is_saved ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                            aria-label={data?.is_saved ? "Unsave job" : "Save job"}
                        >
                            {data?.is_saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                        </button>
                    )}
                </div>
            </div>

            {/* Company info */}
            {userData?.type !== 'company' && (
                <div className="flex items-center mt-3">
                    <Link
                        to={`/company/${job?.company_id}`}
                        className="font-medium text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                        {job?.company_name}
                    </Link>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-blue-500 ml-1"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            )}

            {/* Job details */}
            <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                    <span className="font-medium">{LEVELS.find((level) => level.id == job?.level)?.name}</span> ·
                    <span> {job?.min_year}-{job?.max_year} years experience</span>
                </p>

                <div className="text-sm text-gray-600">
                    <span className="font-medium">Skills: </span>
                    <span>{job?.skills?.map((skill: any) => skill?.name).join(', ')}</span>
                </div>
                <div className="text-sm text-gray-600">
                    <span className="font-medium">Salary: </span>
                    <span>{job?.max_salary}-{job?.min_salary}</span>
                </div>


            </div>

            {/* Footer section */}
            <div className="mt-6 flex items-center justify-between">
                <div>


                    {isDone && (
                        <Link
                            to='job/1/apply'
                            className="inline-flex items-center justify-center text-sm font-medium text-blue-600 border border-blue-200 rounded-md px-3 py-1.5 hover:bg-blue-50 transition-colors"
                        >
                            View your Application
                        </Link>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {isDone && isAccepted && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-green-50 text-green-700">
                            <svg className="w-4 h-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Accepted
                        </span>
                    )}

                    {isDone && !isAccepted && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700">
                            <X className="w-4 h-4 mr-1.5" />
                            Rejected
                        </span>
                    )}

                    {userData?.type === 'company' && !noActrions && (
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleDelete && handleDelete(job.id)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                aria-label="Delete job"
                            >
                                <Trash2 size={18} />
                            </button>
                            <Link
                                to={`/post_job/edit/${job.id}`}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                aria-label="Edit job"
                            >
                                <Edit size={18} />
                            </Link>
                            <Link
                                to={`/post_job/view/${job.id}`}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                aria-label="View job"
                            >
                                <Eye size={18} />
                            </Link>
                            <Link
                                to={`/job_applications/${job.id}`}
                                className="text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-50 transition-colors"
                            >
                                View Applications
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};