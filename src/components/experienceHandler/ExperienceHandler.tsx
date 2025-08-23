import { useState } from "react";
import CustomSelectMenu from "../customeSelectMenu/customSelectMenu";
import InputAndLabel from "../input/inputAndLabel";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";
import { jobSchema } from "../../pages/setting/experience/validation/experienceValidation";

type FormValues = {
    id: string;
    years_of_experience: number;
    job_title: string;
    company: string;
    job_category_id: number;
    start_month: number;
    start_year: number;
    end_month?: number;
    end_year?: number;
    still_working: number | any;
};

export default function ExperienceHandler({ experience, setExperience, job_category }: any) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [originalItem, setOriginalItem] = useState<FormValues | null>(null);
    const [isFromEdit, setIsFromEdit] = useState(false);
    const [errors, setErrors] = useState<Record<string, any>>({}); // Changed to track errors by ID

    const handleAdd = () => {
        const newItem = {
            id: Date.now().toString(),
            years_of_experience: 0,
            job_title: "",
            company: "",
            job_category_id: 0,
            start_month: 0,
            start_year: 0,
            end_month: 0,
            end_year: 0,
            still_working: 0
        };
        setExperience([...experience, newItem]);
        setEditingId(newItem.id);
        setOriginalItem(null);
        // Clear any previous errors for this new item
        setErrors(prev => ({ ...prev, [newItem.id]: {} }));
    };

    const handleEdit = (id: string) => {
        const itemToEdit = experience.find((item: FormValues) => item.id === id);
        if (itemToEdit) {
            setOriginalItem({ ...itemToEdit });
            setEditingId(id);
            setIsFromEdit(true);
            // Clear any previous errors for this item when starting to edit
            setErrors(prev => ({ ...prev, [id]: {} }));
        }
    };

    const handleSave = async (data: FormValues) => {
        // Clean up end month/year if needed
        const cleanedData = {
            ...data,
            end_month: data.still_working === 1 ? null : data.end_month,
            end_year: data.still_working === 1 ? null : data.end_year
        };

        try {
            await jobSchema.validate(cleanedData, { abortEarly: false });

            // Clear errors for this item if validation passes
            setErrors(prev => ({ ...prev, [data.id]: {} }));

            if (isFromEdit) {
                axiosInstance.put(`/user-experience/${data.id}`, {
                    years_of_experience: cleanedData.years_of_experience,
                    job_title: cleanedData.job_title,
                    company: cleanedData.company,
                    job_category_id: cleanedData.job_category_id,
                    start_month: cleanedData.start_month,
                    start_year: cleanedData.start_year,
                    end_month: cleanedData.end_month,
                    end_year: cleanedData.end_year,
                    still_working: cleanedData.still_working
                }).then(() => {
                    toast.success("Experience updated successfully");
                    setEditingId(null);
                    setOriginalItem(null);
                    setIsFromEdit(false);
                }).catch((error) => {
                    toast.error(error?.response?.data?.message || "Something went wrong");
                });
            } else {
                axiosInstance.post('/user-experience', {
                    years_of_experience: cleanedData.years_of_experience,
                    job_title: cleanedData.job_title,
                    company: cleanedData.company,
                    job_category_id: cleanedData.job_category_id,
                    start_month: cleanedData.start_month,
                    start_year: cleanedData.start_year,
                    end_month: cleanedData.end_month,
                    end_year: cleanedData.end_year,
                    still_working: cleanedData.still_working
                }).then(() => {
                    toast.success("Experience added successfully");
                    setEditingId(null);
                    setOriginalItem(null);
                }).catch((error) => {
                    toast.error(error?.response?.data?.message || "Something went wrong");
                });
            }
        } catch (err: any) {
            if (err.inner) {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                // Set errors only for this specific item
                setErrors(prev => ({ ...prev, [data.id]: validationErrors }));
            }
        };
    };

    const handleCancel = () => {
        if (originalItem) {
            setExperience((prev: FormValues[]) =>
                prev.map((item: FormValues) =>
                    item.id === editingId ? { ...item, ...originalItem } : item
                )
            );
        }
        setIsFromEdit(false);
        setEditingId(null);
        setOriginalItem(null);
        // Clear errors for this item when canceling
        if (editingId) {
            setErrors(prev => ({ ...prev, [editingId]: {} }));
        }
    };

    const handleDelete = (id: string) => {
        setExperience(experience.filter((item: FormValues) => item.id !== id));
        axiosInstance.delete(`/user-experience/${id}`).then(() => {
            toast.success("Deleted successfully");
            if (editingId === id) {
                setEditingId(null);
                setOriginalItem(null);
            }
            // Remove errors for this deleted item
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }).catch(() => {
            toast.error("Failed to delete experience");
        });
    };

    const handleChange = (id: string, key: keyof FormValues, value: string | number) => {
        setExperience((prev: FormValues[]) =>
            prev.map((item: FormValues) => (item.id === id ? { ...item, [key]: value } : item))
        );

        // Clear error for this field when user makes a change
        if (errors[id] && errors[id][key]) {
            setErrors(prev => ({
                ...prev,
                [id]: { ...prev[id], [key]: undefined }
            }));
        }
    };

    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    const years: { label: string; value: number; }[] = [];
    for (let year = currentYear; year >= startYear; year--) {
        years.push({ label: year.toString(), value: year });
    }

    const months = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        return { id: month, name: month.toString() };
    });

    return (
        <div className="p-4 pt-0 -mt-14 mx-auto space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Add New Experience
                </button>
            </div>

            {experience?.map((item: FormValues) => {
                const isEditing = item.id === editingId;
                const itemErrors = errors[item.id] || {};

                return (
                    <div key={item.id} className="p-4 pt-2 rounded-2xl shadow-2xl space-y-2">
                        <div className="grid grid-cols-1 gap-2 sm:flex-row sm:items-center sm:gap-4 mb-2">
                            {isEditing ? (
                                <div className="flex flex-col">
                                    <div className='flex flex-col relative w-full'>
                                        <span className='font-medium text-[24px] mb-[10px] text-black'>How many years of experience do you have?</span>
                                        <CustomSelectMenu
                                            defaultData={item.years_of_experience}
                                            error={itemErrors.years_of_experience}
                                            options={[
                                                { id: 1, name: "1" }, { id: 2, name: '2' },
                                                { id: 3, name: '3' }, { id: 4, name: '4' },
                                                { id: 5, name: '5' }, { id: 6, name: '6' },
                                                { id: 7, name: '7' }, { id: 8, name: '8' },
                                                { id: 9, name: '9' }, { id: 10, name: '10' },
                                                { id: 11, name: '11' }, { id: 12, name: '12' },
                                                { id: 13, name: '13' }, { id: 14, name: '14' },
                                                { id: 15, name: '15' }, { id: 16, name: '15+' }
                                            ]}
                                            onChange={(e: any) => handleChange(item.id, "years_of_experience", e.id)}
                                        />
                                        <div className='grid grid-cols-2 w-full gap-5 mt-4'>
                                            <InputAndLabel
                                                value={item.job_title}
                                                error={itemErrors.job_title}
                                                label="Job title"
                                                placeholder="Job title"
                                                normalChange
                                                onChange={(e) => handleChange(item.id, "job_title", e.target.value)}
                                                name='job_title'
                                            />
                                            <InputAndLabel
                                                value={item.company}
                                                error={itemErrors.company}
                                                label="Company"
                                                placeholder="Company"
                                                name='company'
                                                normalChange
                                                onChange={(e) => handleChange(item.id, "company", e.target.value)}
                                            />
                                            <CustomSelectMenu
                                                defaultData={item.job_category_id}
                                                error={itemErrors.job_category_id}
                                                shadow={true}
                                                label="Job category"
                                                options={job_category}
                                                isGray
                                                onChange={(e: any) => handleChange(item.id, "job_category_id", e.id)}
                                            />
                                        </div>
                                        <div className='grid grid-cols-2 gap-5 mt-5 w-full'>
                                            <div className='w-[100%] grid grid-cols-1 gap-4 mt-7'>
                                                <CustomSelectMenu
                                                    defaultData={item.start_year}
                                                    error={itemErrors.start_year}
                                                    shadow={true}
                                                    label="Start year"
                                                    options={years.map((year: any) => ({ id: year.value, name: year.value }))}
                                                    isGray
                                                    onChange={(e: any) => handleChange(item.id, "start_year", e.id)}
                                                />
                                                <CustomSelectMenu
                                                    defaultData={item.start_month}
                                                    error={itemErrors.start_month}
                                                    shadow={true}
                                                    label="Start Month"
                                                    options={months}
                                                    isGray
                                                    onChange={(e: any) => handleChange(item.id, "start_month", e.id)}
                                                />
                                            </div>
                                            {item.still_working !== 1 && (
                                                <div className='w-[100%] grid grid-cols-1 gap-4 mt-7'>
                                                    <CustomSelectMenu
                                                        defaultData={item.end_year}
                                                        error={itemErrors.end_year}
                                                        shadow={true}
                                                        label="End year"
                                                        options={years.map((year: any) => ({ id: year.value, name: year.value }))}
                                                        isGray
                                                        onChange={(e: any) => handleChange(item.id, "end_year", e.id)}
                                                    />
                                                    <CustomSelectMenu
                                                        defaultData={item.end_month}
                                                        error={itemErrors.end_month}
                                                        shadow={true}
                                                        label="End Month"
                                                        options={months}
                                                        isGray
                                                        onChange={(e: any) => handleChange(item.id, "end_month", e.id)}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-row items-center mt-5 gap-2 mb-10'>
                                            <input
                                                checked={item.still_working === 1}
                                                id={`checkBox-${item.id}`}
                                                type="checkbox"
                                                title='checkBox'
                                                onChange={(e) => handleChange(item.id, "still_working", e.target.checked ? 1 : 0)}
                                            />
                                            <label htmlFor={`checkBox-${item.id}`} className='font-medium text-[14px] text-[#737373]'>
                                                Currently working there
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className='flex flex-col relative w-full'>
                                        <span className='font-medium text-[24px] mb-[10px] text-black'>How many years of experience do you have?</span>
                                        <CustomSelectMenu
                                            isDisabled
                                            defaultData={item.years_of_experience}
                                            options={[
                                                { id: 1, name: "1" }, { id: 2, name: '2' },
                                                { id: 3, name: '3' }, { id: 4, name: '4' },
                                                { id: 5, name: '5' }
                                            ]}
                                        />
                                        <div className='grid grid-cols-2 w-full gap-5 mt-4'>
                                            <InputAndLabel
                                                disabled
                                                value={item.job_title}
                                                label="Job title"
                                                placeholder="Job title"
                                                name='job_title'
                                            />
                                            <InputAndLabel
                                                disabled
                                                value={item.company}
                                                label="Company"
                                                placeholder="Company"
                                                name='company'
                                            />
                                            <CustomSelectMenu
                                                isDisabled
                                                defaultData={item.job_category_id}
                                                shadow={true}
                                                label="Job category"
                                                options={job_category}
                                                isGray
                                            />
                                        </div>
                                        <div className='grid grid-cols-2 gap-5 mt-5 w-full'>
                                            <div className='w-[100%] grid grid-cols-1 gap-4 mt-7'>
                                                <CustomSelectMenu
                                                    isDisabled
                                                    defaultData={item.start_year}
                                                    shadow={true}
                                                    label="Start year"
                                                    options={years.map((year: any) => ({ id: year.value, name: year.value }))}
                                                    isGray
                                                />
                                                <CustomSelectMenu
                                                    isDisabled
                                                    defaultData={item.start_month}
                                                    shadow={true}
                                                    label="Start Month"
                                                    options={months}
                                                    isGray
                                                />
                                            </div>
                                            {item.still_working !== 1 && (
                                                <div className='w-[100%] grid grid-cols-1 gap-4 mt-7'>
                                                    <CustomSelectMenu
                                                        isDisabled
                                                        defaultData={item.end_year}
                                                        shadow={true}
                                                        label="End year"
                                                        options={years.map((year: any) => ({ id: year.value, name: year.value }))}
                                                        isGray
                                                    />
                                                    <CustomSelectMenu
                                                        isDisabled
                                                        defaultData={item.end_month}
                                                        shadow={true}
                                                        label="End Month"
                                                        options={months}
                                                        isGray
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <div className='flex flex-row items-center mt-5 gap-2 mb-10'>
                                            <input
                                                checked={item.still_working === 1}
                                                id={`checkBox-${item.id}`}
                                                type="checkbox"
                                                title='checkBox'
                                                disabled
                                            />
                                            <label htmlFor={`checkBox-${item.id}`} className='font-medium text-[14px] text-[#737373]'>
                                                Currently working there
                                            </label>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => handleSave(item)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleEdit(item.id)}
                                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};