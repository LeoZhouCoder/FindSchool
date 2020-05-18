import React, { useState } from "react";
import Select from "react-dropdown-select";
import PropTypes from "prop-types";

export default function MultiSelect({ name, options, onChange }) {
  const [allOptions, setAllOptions] = useState(
    options.map((option) => {
      return {
        value: option,
        label: option.charAt(0).toUpperCase() + option.slice(1),
        disabled: false,
      };
    })
  );

  if (allOptions.length === 0) return null;

  const onChangeOptions = (selectedOptions) => {
    allOptions.forEach((option) => {
      if (selectedOptions.length === 1) {
        if (option.value === selectedOptions[0].value) option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
    setAllOptions(allOptions);
    onChange(
      selectedOptions.length === allOptions.length
        ? null
        : selectedOptions.map((option) => option.value)
    );
  };

  const contentRenderer = ({ props, state }) => (
    <div style={{ cursor: "pointer" }}>
      {name}:{" "}
      {state.values.length === props.options.length
        ? "Any"
        : state.values.length === 1
        ? state.values[0].label
        : `${state.values.length}/${props.options.length}`}
    </div>
  );

  return (
    <Select
      multi
      options={allOptions}
      values={allOptions}
      valueField="value"
      labelField="label"
      disabledLabel="At least one option is required"
      contentRenderer={contentRenderer}
      onChange={onChangeOptions}
    />
  );
}

MultiSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired
};
