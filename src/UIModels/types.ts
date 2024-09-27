import { urls } from "@/api";
import { GridColDef } from "@mui/x-data-grid";


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
    hasNew?: boolean;
    showDates?: boolean;
    pagination?: boolean;
    actions?: Array<'edit' | 'delete' | 'options'>;
    params?: P;
    options?: Array<{
        name: string;
        onClick: (arg1?: any, arg2?: any, arg3?: any) => void;
    }>;
}

export interface Input {
    label: string;
    key: string;
    type: 'text' | 'select' | 'multiple' | 'number' | 'boolean' | 'singleLocation' | 'mulipleLocation' | 'customInput';
    validate: boolean;

    lookups?: any[];

    //for select
    lookupDisplayName?: any;
    lookupDisplayValue?: any;

    //for multiple select
    optionLabelKey?: any;
    optionValueKey?: any;
    optionKey?: string;

    //render your own input;
    renderInput?: (arg: any) => React.ReactNode;
}