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
            const v = this.config.form?.inputs.reduce((acc, { key, type, validate }) => {
                acc[key] =
                    validate &&
                    (type === 'text'
                        ? string().required('This field is required')
                        : type === 'select'
                          ? string().required('This field is required')
                          : type === 'number'
                            ? number().required('This field is required')
                            : array().min(0, 'At least one item must be selected'));
                return acc;
            }, {} as any);

            return object().shape({ ...v });
        };

        return <UIModel<R, V, D, P> gridModel={this.config.grid} formModel={this.config.form} validationSchema={validationSchema} />;
    }
};
