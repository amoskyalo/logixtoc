"use client";

import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form } from "formik";
import { SelectField, AutoCompleteField } from "@/components/Inputs";
import { FormDialog } from "@/components/Dialogs";
import { MenuItem, Stack } from "@mui/material";
import {
  LocationsArrayInterface,
  VendorAccount,
  usePostAssignedAccount,
} from "@/api";
import { SubmitButton } from "@/components/Buttons";
import { useGetUser } from "@/hooks";
import { toast } from "react-toastify";

type FormPropsInterface = {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
  locations: LocationsArrayInterface[];
  accounts: VendorAccount[];
};

const AssignedAcountsForm = ({
  open,
  onClose,
  refetch,
  locations,
  accounts,
}: FormPropsInterface) => {
  const [loading, setLoading] = useState(false);

  const { VendorID, UserID: addedBy } = useGetUser();
  const { mutate } = usePostAssignedAccount();

  const validationSchema = () =>
    Yup.object().shape({
      vendorAccountArray: Yup.array().min(
        1,
        "Atleast one account must be selected"
      ),
      vendorLocationID: Yup.number().required("Location field is required"),
    });

  const handlePost = (data: any) => {
    setLoading(true);
    
    const payload = {
      VendorID,
      addedBy,
      vendorLocationID: data.vendorLocationID,
      vendorAccountArray: data.vendorAccountArray.map((v: any) => ({
        vendorAccountID: v.value,
      })),
    };

    mutate(payload, {
        onSuccess: ({data}) => {
            toast.success(data.Message);
            onClose();
            refetch();
            setLoading(false);
        }
    });
  };

  return (
    <FormDialog open={open} onClose={onClose} title="Add New Assigned Accounts">
      <Formik
        onSubmit={handlePost}
        validationSchema={validationSchema()}
        initialValues={{
          vendorAccountArray: [],
          vendorLocationID: "" as unknown as number,
        }}
      >
        {({ getFieldProps, touched, errors, values, setFieldValue }) => {
          return (
            <Form>
              <Stack spacing={3}>
                <SelectField
                  label="Locations"
                  helperText={
                    touched.vendorLocationID && errors.vendorLocationID
                  }
                  error={
                    touched.vendorLocationID && Boolean(errors.vendorLocationID)
                  }
                  {...getFieldProps("vendorLocationID")}
                >
                  {locations.map(({ VendorLocationID, VendorLocationName }) => (
                    <MenuItem value={VendorLocationID} key={VendorLocationID}>
                      {VendorLocationName}
                    </MenuItem>
                  ))}
                </SelectField>

                <AutoCompleteField
                  options={accounts.map(
                    ({ VendorAccountName, VendorAccountID }) => ({
                      title: VendorAccountName,
                      value: VendorAccountID,
                    })
                  )}
                  getOptionLabel={(option: any) => option.title}
                  value={values.vendorAccountArray}
                  multiple
                  label="Accounts"
                  onChange={(event: React.SyntheticEvent, value: any) => {
                    setFieldValue("vendorAccountArray", value);
                  }}
                  helperText={
                    touched.vendorAccountArray && errors.vendorAccountArray
                  }
                  error={
                    touched.vendorAccountArray &&
                    Boolean(errors.vendorAccountArray)
                  }
                />

                <SubmitButton text="Submit" loading={loading} />
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </FormDialog>
  );
};

export default AssignedAcountsForm;
