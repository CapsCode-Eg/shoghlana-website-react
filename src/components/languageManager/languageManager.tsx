
import { useState } from "react";
import CustomSelectMenu from "../customeSelectMenu/customSelectMenu";
import { languageLevels } from "../../utils/constant/profile";
import InputAndLabel from "../input/inputAndLabel";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "sonner";

type Item = {
    id: string;
    language: string;
    level: string;
};

export default function LanguageManager({ languages, setLanguages }: any) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [originalItem, setOriginalItem] = useState<Item | null>(null);
    const [isFromEdit, setIsFromEdit] = useState(false);
    const handleAdd = () => {
        const newItem = { id: Date.now().toString(), name: "", level: "" };
        setLanguages([...languages, newItem]);
        setEditingId(newItem.id);
        setOriginalItem(null);
    };

    const handleEdit = (id: string) => {
        const itemToEdit = languages.find((item) => item.id === id);
        if (itemToEdit) {
            setOriginalItem({ ...itemToEdit }); // Save original for cancel
            setEditingId(id);
            setIsFromEdit(true);
        }
    };

    const handleSave = (data: any) => {
        if (isFromEdit) {
            axiosInstance.put(`/user-language/${data?.id}`, {
                language: data.language,
                level: data.level
            }).then(() => {
                toast.success("Language added successfully")
                setEditingId(null);
                setOriginalItem(null);
                setIsFromEdit(false)
            }).catch((error) => {
                toast.error(error?.response?.data?.msg, { id: 'add-country' })
                toast.error("Something went wrong")
            })
        } else {
            axiosInstance.post('/user-language', {
                language: data.language,
                level: data.level
            }).then(() => {
                toast.success("Language added successfully")
                setEditingId(null);
                setOriginalItem(null);
            }).catch((error) => {
                toast.error(error?.response?.data?.msg, { id: 'add-country' })
                toast.error("Something went wrong")
            })
        }
    };
    const handleCancel = () => {
        if (originalItem) {
            setLanguages((prev) =>
                prev.map((item) =>
                    item.id === editingId ? { ...item, ...originalItem } : item
                )
            );
        }
        setIsFromEdit(false)
        setEditingId(null);
        setOriginalItem(null);
    };

    const handleDelete = (id: string) => {
        setLanguages(languages.filter((item) => item.id !== id));
        axiosInstance.delete(`/user-language/${id}`).then(() => {
            toast.error("Deleted Successfully")
            if (editingId === id) {
                setEditingId(null);
                setOriginalItem(null);
            }
        })
    };

    const handleChange = (id: string, key: keyof Item, value: string) => {
        setLanguages((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
        );
    };

    return (
        <div className="p-4 pt-0 -mt-14  mx-auto space-y-4">
            <div className="flex justify-end">
                <button
                    onClick={handleAdd}
                    className="px-4 py-2 bg-blue-600 jus text-white rounded hover:bg-blue-700"
                >
                    Add New
                </button>
            </div>

            <div className="grid grid-cols-2 gap-5">
                {languages?.map((item) => {
                    const isEditing = item.id === editingId;
                    return (
                        <div key={item.id} className="p-4 pt-2  rounded-2xl shadow-2xl space-y-2 bg-gray-50">
                            <div className="grid grid-cols-2 gap-2 sm:flex-row sm:items-center sm:gap-4 mb-2">
                                {isEditing ? (
                                    <>
                                        <div className="pt-0.5">
                                            <InputAndLabel label="Language" value={item.language} placeholder="Language" normalChange onChange={(e) => handleChange(item.id, "language", e.target.value)} id={item.id} name="language" />
                                        </div>
                                        <CustomSelectMenu options={languageLevels} label="Level" defaultData={item.level} onChange={(e: any) => handleChange(item.id, "level", e.id)} />
                                    </>
                                ) : (
                                    <>
                                        <div className="pt-0.5">
                                            <InputAndLabel disabled label="Language" value={item.language} normalChange placeholder="Language" onChange={(e) => handleChange(item.id, "language", e.target.value)} id={item.id} name="language" />
                                        </div>
                                        <CustomSelectMenu options={languageLevels} isDisabled defaultData={item.level} label="Level" />
                                    </>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                handleSave({
                                                    language: item.language,
                                                    level: item.level,
                                                    id: item.id
                                                })
                                            }}
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
        </div>
    );
};

