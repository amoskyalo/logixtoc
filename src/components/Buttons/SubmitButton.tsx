import React from "react";
import { Button, CircularProgress } from "@mui/material";

export const SubmitButton = ({
  text,
  loading,
}: Readonly<{ text: string; loading: boolean }>) => {
  return (
    <Button
      disableElevation
      fullWidth
      variant="contained"
      type="submit"
      sx={{ height: "40px" }}
      startIcon={loading ? <CircularProgress color="inherit" size={18}/> : null}
    >
      {text}
    </Button>
  );
};

