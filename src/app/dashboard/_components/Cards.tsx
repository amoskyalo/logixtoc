import React from "react";
import { CardsInterface } from "./types";
import { Box, Typography } from "@mui/material";
import FiberSmartRecordIcon from "@mui/icons-material/FiberSmartRecord";

const Cards = (props: Readonly<CardsInterface>) => {
  const {
    cardBackground,
    title,
    subTitle,
    color,
    iconBackground,
    Icon,
    percentages,
  } = props;

  return (
    <Box
      sx={{ backgroundColor: cardBackground ?? "white", p: 2, borderRadius: 2}}
    >
      <Box
        sx={{
          borderLeft: `3px solid ${color}`,
          paddingLeft: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="body2">{subTitle}</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: iconBackground,
            padding: 0.5,
            borderRadius: 1.5,
          }}
        >
          <Icon sx={{ color }} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", columnGap: 4, mt: 1 }}>
        {percentages.map(({ text, value }, index) => (
          <Box
            sx={{ display: "flex", columnGap: 0.5, alignItems: "center" }}
            key={text}
          >
            <FiberSmartRecordIcon
              sx={{ fontSize: 12 }}
              color={index == 0 ? "primary" : "success"}
            />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              {text}: {value}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Cards;
