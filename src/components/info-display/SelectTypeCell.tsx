import React, { useState } from "react";
import Select from "react-select";

import { setShortcutsDisabled } from "../../lib/features/statusSlice";
import { useAppDispatch } from "../../lib/hooks";
import { selectStyle } from "../shared/selectStyle";

interface Props {
  defaultType: string | undefined;
  typeList: readonly string[];
  handleChange;
}

const EditTypeRow = ({ handleChange, typeList, defaultType }: Props) => {
  const dispatch = useAppDispatch();

  const options = typeList.map((type) => ({
    value: type,
    label: type,
  }));

  const [selectedOption, setSelectedOption] = useState({
    value: defaultType,
    label: defaultType,
  });

  const [valueColor, setValueColor] = useState("black");

  return (
    <td className="border p-2 text-black">
      <Select
        value={selectedOption}
        onChange={handleChange(setSelectedOption)}
        options={options}
        onFocus={() => {
          dispatch(setShortcutsDisabled(true));
          setValueColor("gray");
        }}
        onBlur={() => {
          dispatch(setShortcutsDisabled(false));
          setValueColor("black");
        }}
        blurInputOnSelect
        styles={{
          ...selectStyle,
          singleValue: (provided) => ({
            ...provided,
            color: valueColor,
          }),
        }}
        className="text-left"
      />
    </td>
  );
};

export default EditTypeRow;
