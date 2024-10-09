import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useResponsiveness } from '@/hooks';

type Props = {
    steps: string[];
    activeStep: number;
    setActiveStep: any;
    children: React.ReactNode;
    disableNext: boolean;
    submitButton: () => React.ReactNode;
};

const HorizontalLinearStepper = ({ steps, activeStep, setActiveStep, submitButton, children, disableNext }: Readonly<Props>) => {
    const { isMobile } = useResponsiveness();

    const orientation = isMobile ? 'vertical' : 'horizontal';

    const handleNext = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stepper activeStep={activeStep} orientation={orientation} sx={{ width: steps.length < 4 && !isMobile ? 400 : '100%' }}>
                {steps.map((label) => {
                    const stepProps: { completed?: boolean } = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Box sx={{ mb: 3, width: "100%" }}>{children}</Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                {activeStep !== 0 && (
                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                    </Button>
                )}
                <Box sx={{ flex: '1 1 auto' }} />

                {activeStep !== steps.length - 1 ? (
                    <Button disabled={disableNext} onClick={handleNext}>
                        Next
                    </Button>
                ) : (
                    submitButton()
                )}
            </Box>
        </Box>
    );
};

export default HorizontalLinearStepper;
