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
    noValue?: boolean;
    error?: string;
    width?: string;
    height?: string;
}

const CustomSelectMultipleMenu: FC<CustomSelectMenuProps> = ({
    options = [],
    name,
    label,
    error,
    isDisabled,
    noValue,
    placeholder,
    onChange,
    customstyle,
    defaultData = [],
    loading,
    width,
    height,
}) => {
    const [selectedValue, setSelectedValue] = useState<MultiValue<OptionType>>(
        []
    );
    useEffect(() => {
        if (defaultData && Array.isArray(defaultData) && defaultData.length > 0) {
            const updatedSelectedObjects = options.filter((option) =>
                defaultData.includes(option.id)
            );
            setSelectedValue(updatedSelectedObjects || []);
        }
    }, [defaultData, options]);

    const handleOnChange = (selectedOptions: MultiValue<OptionType>) => {
        setSelectedValue(selectedOptions || []);

        const selectedIds = selectedOptions.map((option) => option.id);

        if (onChange) {
            onChange(selectedIds, name);
        }
    };

    const customStyles: StylesConfig<OptionType, true> = {
        control: (provided, state) => ({
            ...provided,
            height: height,
            borderColor: error
                ? "red"
                : state.isFocused
                    ? "blue"
                    : provided.borderColor,
            borderWidth: error ? "2px" : "1px",
            boxShadow: state.isFocused ? "0 0 0 2px blue" : "0 0 0 2px #eee",
            "&:hover": {
                borderColor: error ? "red" : "blue",
            },
        }),
        menu: (provided) => ({
            ...provided,
            color: "#333",
        }),
        container: (provided) => ({
            ...provided,
            borderRadius: "8px",
            ...customstyle,
        }),
        menuPortal: (provided) => ({
            ...provided,
        }),
    };
    return (
        <div
            style={{
                width: `${width}`,
                height: `${height}`,
            }}
        >
            {label && (
                <h1 className="text-[18px] text-[#0E4E5D] font-medium  mb-[1px]">
                    {label}
                    {" : "}
                </h1>
            )}

            <Select
                placeholder={placeholder}
                isDisabled={isDisabled}
                isSearchable={true}
                isClearable={false}
                isLoading={loading}
                defaultValue={noValue ? [] : selectedValue}
                isMulti={true}
                value={noValue ? [] : selectedValue}
                name={name}
                onChange={handleOnChange}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                options={options.map((item) => ({ ...item, name: item.name })) || []}
                styles={customStyles}
                className="p-2"
            />
            {error ? (
                <div className="ps-2 text-red-500">{error}</div>
            ) : (
                <div className="ps-2 opacity-0 disabled">{" "}</div>
            )}
        </div>
    );
};

export default CustomSelectMultipleMenu;
