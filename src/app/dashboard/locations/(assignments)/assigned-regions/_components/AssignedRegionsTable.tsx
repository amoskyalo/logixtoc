"use client";

import { useState } from "react";
import { DataGrid, DataGridToolbar } from "@/components/DataGrids";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { getColumnWidth, getIndexedRows } from "@/utils";
import { AssignedRegionObjInterface, useDeleteAssignedRegions } from "@/api";
import { DeleteDialog } from "@/components/Dialogs";
import { useGetUser } from "@/hooks";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

type PropsInterface = {
  rows: AssignedRegionObjInterface[];
  isLoading: boolean;
  refetch: () => void;
  onAdd: () => void;
};

const AssignedRegionsTable = ({ rows, isLoading, refetch, onAdd }: PropsInterface) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeParam, setActiveParam] = useState<{
    vendorLocationID: string | number;
    vendorRegionID: string | number;
  }>({
    vendorLocationID: "",
    vendorRegionID: "",
  });

  const { VendorID, UserID: addedBy } = useGetUser();
  const { mutate } = useDeleteAssignedRegions();

  const handleClose = () => {
    setOpen(false);
    setActiveParam({
      vendorLocationID: "",
      vendorRegionID: "",
    });
  };

  const handleDelete = () => {
    setLoading(true);

    mutate(
      { VendorID, addedBy, ...activeParam },
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

  const toolbar = () => <DataGridToolbar onAdd={onAdd} />;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      width: 50,
      sortable: false,
    },
    {
      field: "VendorLocationName",
      headerName: "Location",
      ...getColumnWidth(150),
    },
    {
      field: "VendorRegionName",
      headerName: "Region",
      ...getColumnWidth(150),
    },
    {
      field: "DateAdded",
      headerName: "Date Added",
      ...getColumnWidth(200),
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      getActions: ({ row: { VendorLocationID, VendorRegionID } }) => {
        return [
          <GridActionsCellItem
            label="Delete"
            key="Delete"
            color="error"
            icon={<DeleteIcon />}
            onClick={() => {
              setActiveParam({
                vendorLocationID: VendorLocationID,
                vendorRegionID: VendorRegionID,
              });
              setOpen(true);
            }}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={getIndexedRows(rows)}
        columns={columns}
        getRowId={(row) => row.id}
        slots={{ toolbar }}
        loading={isLoading}
        checkboxSelection
      />

      <DeleteDialog
        open={open}
        loading={loading}
        onOkay={handleDelete}
        onCancel={handleClose}
      />
    </>
  );
};

export default AssignedRegionsTable;
