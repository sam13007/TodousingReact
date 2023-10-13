import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({
  name,
  control,
  type,
  required,
  label,
  ...rest
}) => {
  return (
    <Controller
      name={name}
      control={control}
      {...rest}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
          type={type}
          variant="outlined"
          required={required}
        />
      )}
    />
  );
};
