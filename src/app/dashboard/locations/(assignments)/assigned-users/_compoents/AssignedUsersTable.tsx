"use client";

import { useState } from "react";
import {
  DataGrid,
  DataGridToolbar,
  DataGridContainer,
} from "@/components/DataGrids";
import { DeleteDialog } from "@/components/Dialogs";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import {
  VendorLocationUserAssignmentRow,
  useDeleteVendorLocationUserAssignement,
} from "@/api";
import { getColumnWidth, getIndexedRows } from "@/utils";
import { useGetUser } from "@/hooks";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

type PropsInterface = {
  isLoading: boolean;
  rows: VendorLocationUserAssignmentRow[];
  onAdd: () => void;
  refetch: () => void;
};

const AssignedUsersTable = ({
  isLoading,
  rows,
  onAdd,
  refetch,
}: PropsInterface) => {
  const [activeParam, setActiveParam] = useState<string | number>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { VendorID, UserID: addedBy } = useGetUser();
  const { mutate } = useDeleteVendorLocationUserAssignement();

  const handleClose = () => {
    setActiveParam("");
  };

  const handleDelete = () => {
    setLoading(true);
    mutate(
      { VendorID, addedBy, vendorLocationUserAssignmentID: activeParam },
      {
        onSuccess: ({ data }) => {
          toast.success(data.Message);
          handleClose();
          setLoading(false);
          refetch();
        },
      }
    );
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      width: 60,
      sortable: false,
    },
    {
      field: "VendorLocationName",
      headerName: "Location",
      ...getColumnWidth(150),
    },
    {
      field: "UserName",
      headerName: "Operator",
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
      getActions: ({ row: { VendorLocationUserAssignmentID } }) => {
        return [
          <GridActionsCellItem
            key="delete"
            label="delete"
            icon={<DeleteIcon />}
            color="error"
            onClick={() => setActiveParam(VendorLocationUserAssignmentID)}
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
          rows={getIndexedRows(rows)}
          columns={columns}
          loading={isLoading}
          slots={{ toolbar }}
          getRowId={(row) => row.id}
          checkboxSelection
        />
      </DataGridContainer>

      <DeleteDialog
        open={Number.isInteger(activeParam)}
        onCancel={handleClose}
        loading={loading}
        onOkay={handleDelete}
      />
    </>
  );
};

export default AssignedUsersTable;
