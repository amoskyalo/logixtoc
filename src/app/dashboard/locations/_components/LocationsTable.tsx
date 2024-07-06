"use client";

import { useMemo, useState } from "react";
import {
  DataGrid,
  DataGridContainer,
  DataGridToolbar,
} from "@/components/DataGrids";
import { GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import { getColumnWidth } from "@/utils";
import { LocationsArrayInterface, useDeleteVendorLocation } from "@/api";
import { useGetUser } from "@/hooks";
import { DeleteDialog } from "@/components/Dialogs";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

type RowParamsInterface = {
  addedBy: string;
  vendorLocationID: number | string;
};

const initialParams: RowParamsInterface = {
  addedBy: "",
  vendorLocationID: "",
};

const LocationsTable = ({
  onAdd,
  rows,
  isLoading,
  refetch,
}: Readonly<{
  onAdd: () => void;
  refetch: () => void;
  rows: LocationsArrayInterface[];
  isLoading: boolean;
}>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [activeParams, setActiveParams] =
    useState<RowParamsInterface>(initialParams);

  const { VendorID, UserID } = useGetUser();
  const { mutate } = useDeleteVendorLocation();

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
      field: "VendorLocationTypeName",
      headerName: "Type",
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
      ...getColumnWidth(175),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      type: "actions",
      getActions: ({ row: { AddedByName, VendorLocationID } }) => {
        return [
          <GridActionsCellItem
            key="edit"
            label="Edit"
            color="success"
            // onClick={() => console.log(row)}
            icon={<EditIcon />}
          />,
          <GridActionsCellItem
            key="delete"
            label="Delete"
            color="error"
            onClick={() => {
              setActiveParams({
                addedBy: AddedByName,
                vendorLocationID: VendorLocationID,
              });
              setOpen(true);
            }}
            icon={<DeleteIcon />}
          />,
        ];
      },
    },
  ];

  const handleDelete = () => {
    const {  vendorLocationID } = activeParams;
    setLoading(true);
    mutate(
      {
        VendorID,
        addedBy: UserID,
        vendorLocationID,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("Locaion deleted successfuly!");
          setActiveParams(initialParams);
          refetch();
          setOpen(false);
        },
        onError: () => {
          setLoading(false);
          toast.error("Error while deleting location!");
          setActiveParams(initialParams);
          setOpen(false);
        },
      }
    );
  };

  const toolbar = () => {
    return <DataGridToolbar onAdd={onAdd} />;
  };

  const indexedRows = useMemo(() => {
    return rows.map((row, index) => {
      return { id: index + 1, ...row };
    });
  }, [rows]);

  return (
    <>
      <DataGridContainer>
        <DataGrid
          columns={columns}
          rows={indexedRows}
          slots={{ toolbar }}
          loading={isLoading}
          getRowId={(row) => row.id}
          checkboxSelection
        />
      </DataGridContainer>

      <DeleteDialog
        open={open}
        loading={loading}
        onOkay={handleDelete}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default LocationsTable;
