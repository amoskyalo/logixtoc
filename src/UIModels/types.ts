import { urls } from '@/api';
import { GridColDef } from '@mui/x-data-grid';

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
    inputs: Array<Input>;
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

export interface CommonInputTypes {
    label: string;
    key: string;
    validate: boolean;
}

export interface TextNNumber extends CommonInputTypes {
    type: 'text' | 'number';
}

export interface CustomInput extends CommonInputTypes {
    type: 'customInput';
    renderInput: (arg: any) => React.ReactNode;
}

export interface BooleanInput extends CommonInputTypes {
    type: 'boolean';
}

export interface MultiLocation extends CommonInputTypes {
    type: 'mulipleLocation';
}

export interface SingleLocation extends CommonInputTypes {
    type: 'singleLocation';
}
export interface Select extends CommonInputTypes {
    type: 'select';
    lookups: any[];
    lookupDisplayName: any;
    lookupDisplayValue: any;
}
export interface MultipleSelect extends CommonInputTypes {
    type: 'multiple';
    lookups: any[];
    optionLabelKey: any;
    optionValueKey: any;
    optionKey: string;
}

export type Input = TextNNumber | CustomInput | BooleanInput | MultiLocation | SingleLocation | Select | MultipleSelect;
