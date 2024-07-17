"use client";

import { DataGrid, DataGridToolbar } from "@/components/DataGrids";
import { AssignedProductInterface, useDeleteAssignedProducts } from "@/api";
import { getIndexedRows, getColumnWidth } from "@/utils";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { useState } from "react";
import { useGetUser } from "@/hooks";
import { toast } from "react-toastify";
import { DeleteDialog } from "@/components/Dialogs";
import DeleteIcon from "@mui/icons-material/Delete";

type PropsInterface = {
  onAdd: () => void;
  refetch: () => void;
  rows: AssignedProductInterface[];
  isLoading: boolean;
};

const AssignedProductsTable = ({
  rows,
  onAdd,
  isLoading,
  refetch,
}: PropsInterface) => {
  const [loading, setLoading] = useState(false);
  const [activeParam, setActiveParam] = useState<string | number>("");

  const { VendorID, UserID: addedBy } = useGetUser();
  const { mutate } = useDeleteAssignedProducts();

  const handleClose = () => {
    setActiveParam("");
  };

  const handleDelete = () => {
    setLoading(true);
    mutate(
      { VendorID, addedBy, vendorLocationProductTypeID: activeParam },
      {
        onSuccess: ({ data }) => {
          toast.success(data.Message);
          refetch();
          handleClose();
          setLoading(false);
        },
      }
    );
  };

  const toolbar = () => <DataGridToolbar onAdd={onAdd} />;

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No.",
      width: 40,
      sortable: false,
    },
    {
      field: "VendorLocationName",
      headerName: "Location",
      ...getColumnWidth(150),
    },
    {
      field: "VendorProductTypeName",
      headerName: "Product Type",
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
      getActions: ({ row: { VendorLocationProductTypeID } }) => {
        return [
          <GridActionsCellItem
            label="Delete"
            key="Delete"
            color="error"
            icon={<DeleteIcon />}
            onClick={() => setActiveParam(VendorLocationProductTypeID)}
          />,
        ];
      },
    },
  ];

  return (
    <>
      <DataGrid
        rows={getIndexedRows(rows)}
        loading={isLoading}
        slots={{ toolbar }}
        columns={columns}
        checkboxSelection
      />

      <DeleteDialog
        loading={loading}
        onOkay={handleDelete}
        onCancel={handleClose}
        open={Number.isInteger(activeParam)}
      />
    </>
  );
};

export default AssignedProductsTable;
