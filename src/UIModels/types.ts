import { urls } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { FormikProps } from 'formik';

export type Column = GridColDef & { mobileWidth?: number };

export interface UIProps<V, D, P> {
    gridModel: GridModelInterface<D, P>;
    formModel?: FormModelInterface<V>;
    validationSchema?: any;
}

export interface FormModelInterface<V> {
    title: string;
    submitKey: keyof typeof urls;
    initialValues: any;
    modifyData?: (arg: V) => any;
    inputs: Array<Input<V>>;
}

export interface APIResponse<R> {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
    Data: R[];
}

export interface GridModelInterface<D, P> {
    fetchUrl: keyof typeof urls;
    columns: Column[];
    deleteUrl?: keyof typeof urls;
    initialDeleteParams?: D; // only passed if we are setting delete params from this side.
    showDates?: boolean;
    pagination?: boolean;
    showActions?: boolean;
    actions?: Array<'edit' | 'delete' | 'options'>;
    params?: P;
    options?: Array<{
        name: string;
        onClick: (arg1?: any, arg2?: any, arg3?: any) => void;
    }>;
}

export interface CommonInputTypes<V> {
    label: string;
    key: keyof V;
    validate: boolean;
}

export interface TextNNumber {
    type: 'text' | 'number';
}

export interface CustomInput<V> {
    type: 'customInput';
    dataType: 'object' | 'string' | 'array' | 'number';
    renderInput: (arg: FormikProps<V>) => React.ReactNode;
}

export interface BooleanInput {
    type: 'boolean';
}

export interface MultiLocation {
    type: 'mulipleLocation';
}

export interface SingleLocation {
    type: 'singleLocation';
}
export interface Select {
    type: 'select';
    lookups: any[];
    lookupDisplayName: any;
    lookupDisplayValue: any;
}
export interface MultipleSelect {
    type: 'multiple';
    lookups: any[];
    optionLabelKey: any;
    optionValueKey: any;
    optionKey: string;
}

export type Input<V> = CommonInputTypes<V> & (TextNNumber | CustomInput<V> | BooleanInput | MultiLocation | SingleLocation | Select | MultipleSelect);