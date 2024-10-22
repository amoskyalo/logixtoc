import { urls } from '@/api';
import { GridColDef } from '@mui/x-data-grid';
import { FormikProps } from 'formik';

export type Column = GridColDef & { mobileWidth?: number };
export interface APIResponse<R> {
    Error: boolean;
    Message: string;
    Page: number;
    PageSize: number;
    StatusCode: number;
    TotalCount: number;
    Data: R[];
}
export interface UIProps<V, D, P> {
    gridModel: GridModelInterface<D, P>;
    formModel?: FormModelInterface<V>;
    validationSchema?: any;
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
        onClick?: (arg1?: any, arg2?: any, arg3?: any) => void;
    }>;
}
export interface Form<V> {
    dialogSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    title: string;
    submitKey: keyof typeof urls;
    modifyData?: (arg: V) => any;
    watch?: (arg: V) => void;
}
export interface NormalForm<V> {
    type: 'normal';
    initialValues: any;
    inputs: Array<Input<V>>;
}

export interface GridForm {
    type: 'gridForm';
    focusField: string;
    newRow: any;
    columns: GridColDef[];
}

export interface StepperForm<V> {
    type: 'stepperForm';
    steps: Array<Omit<NormalForm<V>, 'initialValues'> | GridForm>;
    stepsLabels: string[];
    stepBasedDialogSize?: (arg: number) => 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    initialValues?: any;
}

export type FormModelInterface<V> = Form<V> & (NormalForm<V> | StepperForm<V> | GridForm);
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

export interface Checkbox {
    type: 'checkbox';
    options: Array<{ name: string; value: string | number }>;
}

export type Input<V> = CommonInputTypes<V> &
    (TextNNumber | CustomInput<V> | BooleanInput | MultiLocation | SingleLocation | Select | MultipleSelect | Checkbox);
