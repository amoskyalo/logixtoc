"use client";

import React from "react";
import { Tabs, Tab, Box, Chip } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useResponsiveness } from "@/hooks";

type PropsInterface = {
  parentRoute: string;
  tabsList: string[];
};

const PageTabs = ({ tabsList, parentRoute }: PropsInterface) => {
  const path = usePathname();
  const router = useRouter();
  const { isMobile } = useResponsiveness();

  const isActive = (tab: string) => {
    if (tab !== parentRoute) {
      return path.includes(tab);
    }

    return path === `/dashboard/${parentRoute}`;
  };

  const handleNavigate = (tab: string) => {
    if (tab === parentRoute) {
      router.push(`/dashboard/${parentRoute}`);
    } else {
      router.push(`/dashboard/${parentRoute}/${tab}`);
    }
  };

  return (
    <Tabs
      variant="scrollable"
      scrollButtons={isMobile}
      allowScrollButtonsMobile={isMobile}
    >
      <Box sx={{ mt: 0.8, display: "flex", columnGap: 1 }}>
        {tabsList.map((tab) => (
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

export default PageTabs;
