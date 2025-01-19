import React from "react";
import ReactSelect, { MultiValue, SingleValue } from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

export interface Option {
  label: string;
  value: string;
}

interface Props {
  options: Option[];
  defaultValue?: Option | Option[];
  onValueChange: (newValue: Option[]) => void;
  isMulti?: boolean;
}

export const Select: React.FC<Props> = ({
  options,
  defaultValue,
  onValueChange,
  isMulti = false,
}) => {
  const handleChange = (
    newValue: MultiValue<Option> | SingleValue<Option> | null
  ) => {
    if (Array.isArray(newValue)) {
      // Multi-select scenario
      onValueChange(newValue);
    } else if (newValue) {
      // Single-select scenario
      onValueChange([newValue as Option]);
    } else {
      // No selection
      onValueChange([]);
    }
  };

  return (
    <ReactSelect
      // closeMenuOnSelect={!isMulti}
      components={animatedComponents}
      defaultValue={
        isMulti ? (defaultValue as Option[]) : (defaultValue as Option)
      }
      options={options}
      onChange={handleChange}
      className="z-50 min-w-72 max-w-96"
      isMulti={isMulti}
      isSearchable
      isClearable={false}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary25: "#ffedd5",
          primary: "##ffedd5",
        },
      })}
      styles={{
        menuList: (base) => ({
          ...base, // Spread the base styles
          maxHeight: "500px",
        }),
      }}
    />
  );
};

export default Select;
