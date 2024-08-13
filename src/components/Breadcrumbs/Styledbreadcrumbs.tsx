import { emphasize, styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

export const StyledBreadcrumb = styled(Chip)(({ theme }) => {
      const backgroundColor =
         theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[800];

   return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      cursor: "pointer",
      '&:hover, &:focus': {
         backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
         boxShadow: theme.shadows[1],
         backgroundColor: emphasize(backgroundColor, 0.12),
      },
   };
}) as typeof Chip;
