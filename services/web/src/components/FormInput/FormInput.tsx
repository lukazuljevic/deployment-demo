import { TextField, type TextFieldProps } from "@mui/material";

const FormInput = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          fontSize: "24px",

          "& fieldset": {
            borderColor: "white",
          },

          "&:hover fieldset": {
            borderColor: "var(--color-peach)",
            transition: "border-color 0.2s ease",
          },

          "&.Mui-focused fieldset": {
            borderColor: "var(--color-peach)",
            borderWidth: 4,
          },
        },

        "& label.MuiInputLabel-root": {
          color: "rgba(255,255,255,0.7)",
          fontSize: "24px",
        },

        "& .MuiInputBase-input": {
          color: "white",
        },
        "& .MuiFormHelperText-root": {
          color: "red",
          fontWeight: "bold",
          fontSize: "16px",
        },
        "& label.Mui-focused": {
          color: "white",
        },
        "& label.MuiInputLabel-shrink": {
          color: "white",
        },
      }}
    />
  );
};

export default FormInput;
