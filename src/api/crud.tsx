import { UIModel, GridModelInterface, FormModelInterface } from '@/UIModels';
import { number, string, array, object } from 'yup';

export const APPCRUD = class<R, V, D, P> {
    config: {
        grid: GridModelInterface<D, P>;
        form?: FormModelInterface<V>;
    };

    constructor(config: { grid: GridModelInterface<D, P>; form?: FormModelInterface<V> }) {
        this.config = config;
    }

    render() {
        const validationSchema = () => {
            const form = this.config.form;

            const string_v = string().required('This field is required');
            const num_v = number().required('This field is required');
            const arr_v = array().min(0, 'At least one item must be selected');

            const fn = (type: any, input: any) => {
                if (type === 'text' || type === 'select' || type === 'singleLocation' || type === 'checkbox') {
                    return string_v;
                }

                if (type === 'number') {
                    return num_v;
                }

                if (type === 'customInput') {
                    return input.dataType === 'array' ? arr_v : input.dataType === 'number' ? num_v : string_v;
                }

                return null;
            };

            const inputs =
                form?.type === 'normal'
                    ? form.inputs
                    : form?.type === 'stepperForm'
                      ? (form.steps.find((step) => step.type === 'normal') as any).inputs
                      : [];

            const schema = inputs?.reduce((acc: any, input: any) => {
                const { key, type, validate } = input;

                acc[key] = validate && fn(type, input);
                return acc;
            }, {} as any);

            return object().shape(schema);
        };

        return <UIModel<R, V, D, P> gridModel={this.config.grid} formModel={this.config.form} validationSchema={validationSchema} />;
    }
};
