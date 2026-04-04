import type { ProductColor } from "@cart-app/types";
import Color from "@components/Color/Color";
import useColorFilter from "@hooks/useColorFilter";
import { colorOptions } from "common/helpers/colorMap";
import Select, { components } from "react-select";
import styles from "./ColorFilter.module.scss";

const ColorOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className={styles.wrapper}>
        <Color color={props.data.value}></Color>
        {props.data.label.toLowerCase()}
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
          className={styles.input}
        ></input>
      </div>
    </components.Option>
  );
};

const ColorFilter = () => {
  const { selectedColors, setSelectedColors } = useColorFilter();

  return (
    <Select<{ label: string; value: ProductColor }, true>
      options={colorOptions}
      value={selectedColors.map((color) => ({
        label: color,
        value: color,
      }))}
      onChange={(selected) => {
        setSelectedColors(selected.map((item: any) => item.value));
      }}
      isMulti
      hideSelectedOptions={false}
      placeholder="Color"
      components={{ Option: ColorOption }}
      styles={{
        option: (provided, state) => ({
          ...provided,
          background: state.isFocused ? "#f5f5f5" : "none",
        }),
        control: (provided) => ({
          ...provided,
          fontSize: "28px",
          textAlign: "start",
          border: "none",
          borderBottom: "2px solid #5a3e36",
        }),
      }}
    ></Select>
  );
};

export default ColorFilter;
