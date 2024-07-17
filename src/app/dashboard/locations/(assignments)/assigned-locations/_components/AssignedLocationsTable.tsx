import { useState } from "react";
import {
  DataGrid,
  DataGridContainer,
  DataGridToolbar,
} from "@/components/DataGrids";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { getColumnWidth, getIndexedRows } from "@/utils";
import { AssignedLocationObject, useDeleteAssignedLocation } from "@/api";
import { DeleteDialog } from "@/components/Dialogs";
import { useGetUser } from "@/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

type PropsInterface = {
  rows: AssignedLocationObject[];
  isLoading: boolean;
  onAdd: () => void;
  refetch: () => void;
};

const AssignedLocationsTable = ({ rows, isLoading, onAdd, refetch }: PropsInterface) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [activeParam, setActiveParam] = useState<string | number>("");

  const { VendorID, UserID: addedBy } = useGetUser();
  const { mutate } = useDeleteAssignedLocation();

  const handleClose = () => {
    setActiveParam("");
  };

  const handleDelete = () => {
    setLoading(true);
    mutate({ VendorID, addedBy, vendorLocationAssignmentID: activeParam }, {
      onSuccess: (({data}) => {
        toast.success(data.Message);
        handleClose();
        refetch();
        setLoading(false);
      })
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      sortable: false,
      headerName: "No.",
      width: 60,
    },
    {
      field: "VendorLocationName",
      headerName: "Location",
      ...getColumnWidth(150),
    },
    {
      field: "AssignedVendorLocationName",
      headerName: "Location Assigned",
      ...getColumnWidth(200),
    },
    {
      field: "AddedByName",
      headerName: "Added By",
      ...getColumnWidth(150),
    },
    {
      field: "DateAdded",
      headerName: "Date Added",
      ...getColumnWidth(200),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      getActions: ({ row: { VendorLocationAssignmentID } }) => {
        return [
          <GridActionsCellItem
            label="Delete"
            color="error"
            key="delete"
            icon={<DeleteIcon />}
            onClick={() => setActiveParam(VendorLocationAssignmentID)}
          />,
        ];
      },
    },
  ];

  const toolbar = () => <DataGridToolbar onAdd={onAdd} />;

  return (
    <>
      <DataGridContainer>
        <DataGrid
          columns={columns}
          rows={getIndexedRows(rows)}
          loading={isLoading}
          slots={{ toolbar }}
          checkboxSelection
        />
      </DataGridContainer>

      <DeleteDialog
        open={Number.isInteger(activeParam)}
        loading={loading}
        onCancel={handleClose}
        onOkay={handleDelete}
      />
    </>
  );
};

export default AssignedLocationsTable;
