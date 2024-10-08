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

            const inputs =
                form?.type === 'normal' ? form.inputs : form?.type === 'stepperForm' ? form.steps.find((step) => step.type === 'normal')?.inputs : [];

            const v = inputs?.reduce((acc, input) => {
                const { key, type, validate } = input;

                const string_v = string().required('This field is required');
                const num_v = number().required('This field is required');
                const arr_v = array().min(0, 'At least one item must be selected');

                acc[key] =
                    validate &&
                    (type === 'text' || type === 'select' || type === 'singleLocation'
                        ? string_v
                        : type === 'number'
                          ? num_v
                          : type === 'customInput'
                            ? input.dataType === 'array'
                                ? arr_v
                                : input.dataType === 'number'
                                  ? num_v
                                  : string_v
                            : null);
                return acc;
            }, {} as any);

            return object().shape({ ...v });
        };

        return <UIModel<R, V, D, P> gridModel={this.config.grid} formModel={this.config.form} validationSchema={validationSchema} />;
    }
};
