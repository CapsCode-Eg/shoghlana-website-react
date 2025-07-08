// components/QuestionList.tsx

import React, { useEffect, useState } from "react";
import InputAndLabel from "../input/inputAndLabel";
import { Delete } from "lucide-react";

interface Question {
    id: number;
    text: string;
}

export default function QuestionList({ setData, data, jobQuestion }: { setData?: React.Dispatch<React.SetStateAction<any>>, data?: any, jobQuestion?: any }) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [nextId, setNextId] = useState(1);

    const handleAdd = () => {
        setQuestions([...questions, { id: nextId, text: "" }]);
        setNextId(nextId + 1);
    };

    const handleEdit = (id: number, newText: string) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, text: newText } : q))
        );
    };

    const handleDelete = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };
    useEffect(() => {
        if (data?.questions) {
            const initialQuestions = data.questions.map((q: string, index: number) => ({
                id: index + 1,
                text: q
            }));
            setQuestions(initialQuestions);
            setNextId(initialQuestions.length + 1);
        }
    }, [jobQuestion])
    useEffect(() => {
        const newQuestions = questions.filter(q => q.text.trim() !== "");
        const handleQuestions = newQuestions.map(q => q.text)
        if (setData) {
            setData({ ...data, questions: handleQuestions });
        }
    }, [questions])
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions</h2>

            {questions.map((q) => (
                <div key={q.id} className="flex items-end gap-2">

                    <InputAndLabel label="Question" name={`question-${q.id}`} type="text" normalChange value={q.text} onChange={(e) => handleEdit(q.id, e.target.value)} error="" />
                    <button
                        title="Delete Question"
                        type="button"
                        onClick={() => handleDelete(q.id)}
                        className="px-3 py-1 bg-red-500 h-[40px] text-white rounded hover:bg-red-600"
                    >
                        <Delete className="h-4 w-4" />
                    </button>
                </div>
            ))}

            <button
                onClick={handleAdd}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Add Question
            </button>
        </div>
    );
}
