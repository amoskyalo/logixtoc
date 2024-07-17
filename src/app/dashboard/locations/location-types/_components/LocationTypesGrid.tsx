"use client";

import {
  DataGridToolbar,
  DataGrid,
  DataGridEditNDelete,
} from "@/components/DataGrids";
import { GridColDef } from "@mui/x-data-grid";
import { getColumnWidth, getIndexedRows } from "@/utils";
import { StatusChips } from "@/components/Chips";
import { VendorLocationType, useDeleteVendorLocationTypes } from "@/api";
import { useGetUser } from "@/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { DeleteDialog } from "@/components/Dialogs";

type PropsInterface = {
  isLoading: boolean;
  rows: VendorLocationType[];
  refetch: () => void;
  onAdd: () => void;
};

const LocationTypesGrid = ({ isLoading, rows, refetch, onAdd }: PropsInterface) => {
  const [activeParams, setActiveParams] = useState<string | number>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { VendorID, UserID: addedBy } = useGetUser();
  const { mutate } = useDeleteVendorLocationTypes();

  const handleDelete = () => {
    setLoading(true);

    mutate(
      { VendorID, addedBy, vendorLocationTypeID: activeParams },
      {
        onSuccess: ({ data }) => {
          toast.success(data.Message);
          refetch();
          setLoading(true);
          setActiveParams("");
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
      field: "VendorLocationTypeName",
      headerName: "Location Type",
      ...getColumnWidth(150),
    },
    {
      field: "LocationsArray",
      headerName: "Count",
      type: "number",
      valueGetter: (__, row) => row.LocationArray.length,
      ...getColumnWidth(150),
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
      field: "StatusID",
      headerName: "Status",
      ...getColumnWidth(100),
      renderCell: ({ row: { StatusID } }) => (
        <StatusChips statusID={StatusID} name="Active" />
      ),
    },
    {
      field: "Actions",
      type: "actions",
      headerName: "Actions",
      getActions: ({ row: { VendorLocationTypeID } }) => {
        return [
          <DataGridEditNDelete
            key="actions"
            onDelete={() => setActiveParams(VendorLocationTypeID)}
            onEdit={() => null}
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
        columns={columns}
        slots={{ toolbar }}
        getRowId={(row) => row.id}
        checkboxSelection
      />

      <DeleteDialog
        loading={loading}
        open={Number.isInteger(activeParams)}
        onOkay={handleDelete}
        onCancel={() => setActiveParams("")}
      />
    </>
  );
};

export default LocationTypesGrid;
