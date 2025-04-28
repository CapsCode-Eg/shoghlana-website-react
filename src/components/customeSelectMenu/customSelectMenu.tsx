import { useState, useEffect, FC } from "react";
import Select, { SingleValue, MultiValue, StylesConfig } from "react-select";

interface OptionType {
    id: number;
    name: string;
}

interface CustomSelectMenuProps {
    options?: OptionType[];
    selected?: boolean;
    name?: string;
    sx?: object;
    isMultiChoices?: boolean;
    label?: string;
    isDisabled?: boolean;
    placeholder?: string;
    onChange?: (
        value: SingleValue<OptionType> | MultiValue<OptionType>,
        name?: string
    ) => void;
    defaultData?: number | undefined | null;
    customstyle?: object;
    loading?: boolean;
    helperText?: string;
    fullWidth?: boolean;
    error?: string;
    width?: string;
    higth?: string;
    shadow?: boolean;
    isGray?: boolean;
    noBorder?: boolean;
    disableInternalState?: boolean;
    icon?: React.ReactNode;
}

const CustomSelectMenu: FC<CustomSelectMenuProps> = ({
    options = [],
    name,
    isMultiChoices = false,
    label,
    isDisabled,
    placeholder,
    onChange,
    customstyle,
    defaultData,
    noBorder,
    loading,
    error,
    width,
    shadow = true,
    isGray = false,
    higth,
    disableInternalState = false,
    icon,
}) => {
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        if (!disableInternalState && defaultData !== undefined) {
            const updatedSelectedObject =
                options.length > 0 &&
                options?.find((option) => option.id === defaultData);
            // @ts-expect-error: Type mismatch
            setSelectedValue(updatedSelectedObject || null);
        }
    }, [defaultData, options, disableInternalState]);

    const handleOnChange = (
        selectedOption: SingleValue<OptionType> | MultiValue<OptionType>
    ) => {
        if (!disableInternalState) {
            // @ts-expect-error: Type mismatch
            setSelectedValue(selectedOption);
        }
        if (onChange) {
            if (!disableInternalState) {
                onChange(selectedOption, name)
            } else {
                onChange(selectedOption)
            }
        };
    };

    const customStyles: StylesConfig<OptionType, boolean> = {
        control: (provided, state) => ({
            ...provided,
            paddingLeft: "6px",
            minHeight: "40px",
            backgroundColor: noBorder ? "#f9f9fa" : "transparent",
            borderRadius: "0.5rem",
            borderColor: error
                ? "red"
                : state.isFocused
                    ? "rgba(94, 94, 94,0.4)"
                    : isGray
                        ? "#f5f5f5"
                        : "#018AAF",
            borderWidth: noBorder ? "0px" : error ? "1px" : "1px",
            boxShadow: shadow ? "0px 8px 8px rgba(0, 0, 0, 0.16)" : "",
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
        menuPortal: (provided) => ({
            ...provided,
        }),
    };

    return (
        <div
            className={`mt-1`}
            style={{
                width: `${width}`,
                height: `${higth}`,
            }}
        >
            {label ? (
                <h1 className={`text-[13.45px] font-[400]  text-[#84818A] mb-[4px]`}>
                    {label}
                </h1>
            ) : null}

            <div className={`flex bg-[transparent] rounded-lg items-center`}>
                {icon}
                <Select
                    placeholder={placeholder}
                    isDisabled={!!isDisabled}
                    isSearchable={true}
                    isClearable={false}
                    isLoading={loading}
                    className="w-full"
                    isMulti={isMultiChoices}
                    defaultValue={!disableInternalState ? selectedValue : undefined}
                    name={name}
                    value={!disableInternalState ? selectedValue : undefined}
                    onChange={handleOnChange}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id.toString()}
                    options={
                        options?.length > 0
                            ? options?.map((item) => ({ ...item, name: item.name }))
                            : []
                    }
                    classNames={{
                        control: () => "custom-select",
                        menu: () => "outline-none custom-menu",
                    }}
                    styles={customStyles}
                />
            </div>
            {error ? (
                <div className="ps-2 text-red-500">{error}</div>
            ) : (
                <div className="ps-2 opacity-0 disabled">{" "}</div>
            )}
        </div>
    );
};

export default CustomSelectMenu;