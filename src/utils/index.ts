import { statusColors } from '@/Constants';
import { GridRowModel } from '@mui/x-data-grid';
import { DatesInterface } from '@/components/DataGrids';
import { MutateOptionsArgs } from './types';
import { FormikProps } from 'formik';
import { snackbarToast } from '@/components/Snackbar';
import dayjs from 'dayjs';

const Utils = class {
    constructor() {
        this.isDefaltDate = this.isDefaltDate.bind(this);
    }

    isDefaultFilter(value: any) {
        return value === 99 || value === 0;
    }

    isDefaltDate(param: string, value: any) {
        return (
            (param === 'StartDate' && value === this.getInitialDates().startDate) || (param === 'EndDate' && value === this.getInitialDates().endDate)
        );
    }

    isDefaultPagination(param: string, value: any) {
        return (param === 'PageNO' && value === 1) || (param === 'PageSize' && value === 10);
    }

    validateObjectFields(fields: any[]) {
        return fields.some((field) => Object.values(field).some((value) => value === ''));
    }

    getIndexedRows(rows?: GridRowModel[]) {
        return rows?.map((row, index) => ({ id: index + 1, ...row }));
    }

    getMappedObjectArray<Type>(key: keyof Type, arr: Type[]) {
        return arr.map((item) => {
            return { [key]: item[key] } as Pick<Type, typeof key>;
        });
    }

    getStatusChipColor(statusID: string | number) {
        const key = `statusID${statusID}`;

        return statusColors[key as keyof typeof statusColors] ?? '#66CC66';
    }

    getColumnWidth(width: number, isMobile: boolean) {
        return {
            ...(isMobile ? { width } : { flex: 1 }),
        };
    }

    getInitialDates(): DatesInterface {
        const format = 'YYYY-MM-DD';
        const startDate = dayjs().subtract(1, 'month').format(format);
        const endDate = dayjs().format(format);

        return { startDate, endDate };
    }

    mutateOptions(args: MutateOptionsArgs) {
        const { onClose, refetch, setLoading } = args;

        const options = {
            onSuccess: ({ data }: any) => {
                snackbarToast.success(data.Message);
                onClose();
                setLoading(false);
                refetch?.();
            },
            onError: (error: any) => {
                snackbarToast.error(error.message);
                setLoading(false);
                onClose();
            },
        };

        return options;
    }

    getFormikFieldProps<Type>(formik: FormikProps<Type>, field: keyof Type, autoCompleteField?: boolean) {
        const { values, errors, touched, getFieldProps, setFieldValue } = formik;

        const error = touched[field] && Boolean(errors[field]);
        const helperText = touched[field] && (errors[field] as any);

        const onChange: any = (__: React.SyntheticEvent, newValue: any) => {
            setFieldValue(field as string, newValue);
        };

        const fieldProps = {
            error,
            helperText,
            ...(autoCompleteField ? { onChange, multiple: true, value: values[field] } : getFieldProps(field as string)),
        };

        return fieldProps;
    }
};

const utils = new Utils();

export default utils;
