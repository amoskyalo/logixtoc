import { CardsInterface } from '../types';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useThemeMode } from '@/hooks';
import FiberSmartRecordIcon from '@mui/icons-material/FiberSmartRecord';

const Cards = (props: Readonly<CardsInterface>) => {
   const { cardBackground, title, subTitle, color, iconBackground, Icon, percentages, value } =
      props;

   const { isDarkMode } = useThemeMode();

   const backgroundColor = isDarkMode ? '#1c252e' : 'white';

   const text = cardBackground && isDarkMode ? 'rgba(0, 0, 0, 0.7)' : '';

   const StyledTypography = styled(Typography)(() => ({
      color: text,
   }));

   return (
      <Box sx={{ backgroundColor: cardBackground ?? backgroundColor, p: 2, borderRadius: 2 }}>
         <Box
            sx={{
               borderLeft: `3px solid ${color}`,
               paddingLeft: 1,
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'flex-start',
            }}
         >
            <Box>
               <StyledTypography variant="subtitle1">{title}</StyledTypography>
               <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 0.5 }}>
                  <StyledTypography variant="body2">{subTitle}: </StyledTypography>
                  <StyledTypography variant="subtitle1">{value}</StyledTypography>
               </Box>
            </Box>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor: iconBackground,
                  padding: 0.5,
                  borderRadius: 1.5,
               }}
            >
               <Icon sx={{ color }} />
            </Box>
         </Box>

         <Box sx={{ display: 'flex', columnGap: 4, mt: 1 }}>
            {percentages.map(({ text, value }, index) => (
               <Box sx={{ display: 'flex', columnGap: 0.5, alignItems: 'center' }} key={text}>
                  <FiberSmartRecordIcon
                     sx={{ fontSize: 12 }}
                     color={index == 0 ? 'primary' : 'success'}
                  />
                  <StyledTypography variant="caption" sx={{ fontWeight: 700 }}>
                     {text}: {isNaN(value) ? '--' : `${value}%`}
                  </StyledTypography>
               </Box>
            ))}
         </Box>
      </Box>
   );
};

export default Cards;
