import React, { useContext } from "react";
import {
  InputAdornment,
  TextField,
  useTheme,
  inputClasses,
  inputAdornmentClasses,
} from "@mui/material";

import dialCodes from "@/data/dialCodes.json";

export default function phoneInput(props) {
  const {
    phoneCode,
    phoneNumber,
    onPhoneCodeChange,
    onPhoneNumberChange,
    placeholder = "",
    error,
    errorMessage,
  } = props;
  const theme = useTheme();

  const key = "dial_code";
  const redUniq = [
    ...dialCodes
      .reduce((uniq, curr) => {
        if (!uniq.has(curr[key])) {
          uniq.set(curr[key], curr);
        }
        return uniq;
      }, new Map())
      .values(),
  ];
  let dialCodesData = redUniq;

  const inputSx = {
    [`& .${inputClasses.formControl}`]: {
      backgroundColor: "common.light40",
      color: "common.dark100",
      pl: 0,
    },
    [`& .${inputAdornmentClasses.root}`]: {
      pl: 0,

      "& select": {
        width: "fit-content",
        pr: "0px !important",
      },
      "& svg": {
        display: "none",
      },
      [`& .${inputClasses.formControl}`]: {
        backgroundColor: "common.light40",
        color: "common.dark100",

        "& fieldset": {
          border: "none !important",
          boxShadow: "none",
        },
      },
    },
    [`& fieldset`]: {
      border: "1px solid",
      borderColor: "common.light30",
    },
    [`& .${inputClasses.formControl}.${inputClasses.focused} fieldset`]: {
      border: "1px solid",
      borderColor: "common.dark100",
    },
    [`& .${inputClasses.formControl}.${inputClasses.error} fieldset`]: {
      border: "1px solid",
      borderColor: "error.main",
    },
    [`& .MuiFormHelperText-root`]: {
      mx: 0,
      fontSize: "11px",
    },
  };
  return (
    <TextField
      {...props}
      placeholder={placeholder}
      fullWidth
      size='small'
      sx={inputSx}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position='start'>
              <TextField
                name='phoneCode'
                select
                required
                fullWidth
                size='small'
                slotProps={{
                  select: {
                    native: true,
                  },
                }}
                value={phoneCode}
                onChange={(e) => onPhoneCodeChange(e.target.value)}
              >
                {dialCodesData.map((item, i) => (
                  <option
                    key={i}
                    value={item.dial_code}
                    style={{
                      color:
                        theme.palette.mode === "dark"
                          ? theme.palette.common.light100
                          : theme.palette.common.dark100,
                    }}
                  >
                    {item.dial_code.replace("+", "")}
                  </option>
                ))}
              </TextField>
            </InputAdornment>
          ),
        },
      }}
      required
      error={error}
      helperText={error ? errorMessage : ""}
      value={phoneNumber}
      onChange={(e) => onPhoneNumberChange(e.target.value)}
    />
  );
}
