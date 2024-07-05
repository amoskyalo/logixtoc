"use client";

import { useState } from "react";
import { LocationsTable, LocationsForm } from "./_components";

const Locations = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <LocationsTable onAdd={() => setOpen(true)} />
      <LocationsForm open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Locations;
