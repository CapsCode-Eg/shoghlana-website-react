import { useState, useEffect, FC } from "react";
import Select, { MultiValue, StylesConfig } from "react-select";

interface OptionType {
    id: number;
    name: string;
}

interface CustomSelectMenuProps {
    options?: OptionType[];
    name?: string;
    label?: string;
    isDisabled?: boolean;
    placeholder?: string;
    onChange?: (value: number[], name?: string) => void;
    defaultData?: number[];
    customstyle?: object;
    loading?: boolean;
    error?: string;
    width?: string;
    height?: string;
}

const CustomSelectMultipleMenu: FC<CustomSelectMenuProps> = ({
    options = [],
    name,
    label,
    isDisabled,
    placeholder,
    onChange,
    customstyle,
    defaultData = [],
    loading,
    error,
    width,
    height,
}) => {
    const [selectedValue, setSelectedValue] = useState<MultiValue<OptionType>>([]);

    useEffect(() => {
        const updatedSelectedObjects = options.filter((option) =>
            defaultData.includes(option.id)
        );
        setSelectedValue(updatedSelectedObjects);
    }, []);

    const handleOnChange = (selectedOptions: MultiValue<OptionType>) => {
        setSelectedValue(selectedOptions);

        const selectedIds = selectedOptions.map(option => option.id);

        if (onChange) {
            onChange(selectedIds, name);
        }
    };

    const customStyles: StylesConfig<OptionType, true> = {
        control: (provided) => ({
            ...provided,
            paddingLeft: "6px",
            minHeight: "40px",
            backgroundColor: "#f9f9fa",
            borderRadius: "0.5rem",
            borderColor: error ? "red" : "#f5f5f5",
            boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.16)",
            "&:hover": {
                borderColor: error ? "red" : "blue",
            },
        }),
        menu: (provided) => ({
            ...provided,
            color: "#333",
            fontSize: "14px",
        }),
        container: (provided) => ({
            ...provided,
            borderRadius: "8px",
            ...customstyle,
        }),
    };

    return (
        <div style={{ width, height }}>
            {label && (
                <h1 className="text-[18px] mb-[1px]">
                    {label} <span className="text-red-500">*</span>
                </h1>
            )}

            <Select
                placeholder={placeholder}
                isDisabled={isDisabled}
                isSearchable={true}
                isClearable={false}
                isLoading={loading}
                isMulti={true}
                value={selectedValue}
                name={name}
                onChange={handleOnChange}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                options={options}
                styles={customStyles}
                className="p-2"
            />
            {error ? (
                <div className="ps-2 text-red-500">{error}</div>
            ) : (
                <div className="ps-2 opacity-0">{" "}</div>
            )}
        </div>
    );
};

export default CustomSelectMultipleMenu;
