import React from "react";

interface TextAreaProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ value = "", onChange, placeholder = "Write your answer here..." }) => {
    return (
        <div className="relative w-full">
            <textarea
                className="w-full p-2 border border-gray-300 rounded-[4px] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            <span className="absolute bottom-3 right-3 text-gray-500 text-sm">
                {value.length}/500
            </span>
        </div>
    );
};

export default TextArea;
