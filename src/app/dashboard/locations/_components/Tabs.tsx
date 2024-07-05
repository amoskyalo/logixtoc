"use client";

import React from "react";
import { Tabs, Tab, Box, Chip } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useResponsiveness } from "@/hooks";

const subTabs: string[] = [
  "Locations",
  "Assigned Users",
  "Assigned Locations",
  "Assigned Products",
  "Assigned Regions",
  "Assigned Accounts",
];

const CustomDialog = () => {
  const path = usePathname();
  const router = useRouter();
  const { isMobile } = useResponsiveness();

  const isActive = (tab: string) => {
    if (tab !== "locations") {
      return path.includes(tab);
    }

    return path === "/dashboard/locations";
  };

  const handleNavigate = (tab: string) => {
    if (tab === "locations") {
      router.push("/dashboard/locations");
    } else {
      router.push(`/dashboard/locations/${tab}`);
    }
  };

  return (
    <Tabs
      variant="scrollable"
      scrollButtons={isMobile}
      allowScrollButtonsMobile={isMobile}
    >
      <Box sx={{ mt: 0.8, display: "flex", columnGap: 2 }}>
        {subTabs.map((tab) => (
          <Tab
            key={tab}
            component={() => {
              return (
                <Chip
                  label={tab}
                  onClick={() =>
                    handleNavigate(tab.toLocaleLowerCase().replace(" ", "-"))
                  }
                  color={
                    isActive(tab.toLocaleLowerCase().replace(" ", "-"))
                      ? "primary"
                      : "default"
                  }
                />
              );
            }}
          />
        ))}
      </Box>
    </Tabs>
  );
};

export default CustomDialog;
