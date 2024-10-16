import { useState } from "react";
import { Box } from "@mui/material";
import NavContainer from "./NavContainer";
// import LocationCard from "./Cards/LocationCard";
import ChecklistIcon from "@mui/icons-material/Checklist";

const CustomersNav = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState("All");

  // const locations = ["Nairobi", "Mombasa", "Kisumu", "Kakuma", "Kiambu", "Isiolo", "Muranga", "Wajir", "Garrisa"];

//   function applySearch() {
//     return searchValue
//       ? locations.filter((location) =>
//           location.VendorLocationName.toLowerCase().includes(
//             searchValue.toLowerCase()
//           )
//         )
//       : locations;
//   }

  const filters = [
    {
      name: "All",
      icon: ChecklistIcon,
      onItemClick: () => setFilterValue("All"),
    },
  ];

  return (
    <NavContainer
      title="Locations List"
      filterOptions={filters}
      filterValue={filterValue}
      setSearchValue={setSearchValue}
      searchValue={searchValue}
      setFilterValue={setFilterValue}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* {locations?.map((location) => (
          <LocationCard location={location} locations={applySearch()} />
        ))} */}
      </Box>
    </NavContainer>
  );
};

export default CustomersNav;