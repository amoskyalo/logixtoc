import { Box, Typography } from "@mui/material";

type PropsInterface = {
  headerName: string;
  subTitle: string;
};

const PageHeader = ({ headerName, subTitle }: PropsInterface) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ color: "rgba(0, 0, 0, 0.7)" }}>
        {headerName}
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "rgba(0, 0, 0, 0.7)", fontWeight: "600" }}
      >
        {subTitle}
      </Typography>
    </Box>
  );
};

export default PageHeader;
