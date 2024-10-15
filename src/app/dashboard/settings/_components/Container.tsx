import { Stack, Box, Typography, Button, Divider } from '@mui/material';
import { useResponsiveness } from '@/hooks';

type Props = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

const SettingsContainer = ({ title, subtitle, children }: Props) => {
    const { isMobile } = useResponsiveness();

    return (
        <Box>
            <Box>
                <Stack direction="row" justifyContent="space-between">
                    <Box>
                        <Typography variant="subtitle1">{title}</Typography>
                        <Typography variant="body2">{subtitle}</Typography>
                    </Box>

                    {!isMobile && (
                        <Button
                            variant="contained"
                            disableElevation
                            size={isMobile ? 'small' : 'medium'}
                            sx={{ textTransform: 'none', height: isMobile ? 32 : 40 }}
                        >
                            Save changes
                        </Button>
                    )}
                </Stack>

                <Divider sx={{ mt: 2 }} />
            </Box>

            {children}

          {isMobile &&   <Button sx={{mt: 4, width: "100%"}} variant="contained" disableElevation>
                Save changes
            </Button>}
        </Box>
    );
};

export default SettingsContainer;
