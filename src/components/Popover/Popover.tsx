import Menu, { MenuProps } from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';

type PropsInterface = {
   anchorEl: null | HTMLElement;
   children: React.ReactNode;
   open: boolean;
   handleClose: () => void;
};

const StyledMenu = styled((props: MenuProps) => (
   <Menu
      {...props}
      elevation={0}
      anchorOrigin={{
         vertical: 'bottom',
         horizontal: 'right',
      }}
      transformOrigin={{
         vertical: 'top',
         horizontal: 'right',
      }}
   />
))(({ theme }) => ({
   '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 150,
      color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      backgroundColor: theme.palette.mode === 'dark' ? '#383838' : '',
      boxShadow:
         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
         padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
         '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
         },
         '&:active': {
            backgroundColor: alpha(
               theme.palette.primary.main,
               theme.palette.action.selectedOpacity,
            ),
         },
      },
   },
}));

const Popover = ({ anchorEl, children, open, handleClose }: PropsInterface) => {
   return (
      <StyledMenu
         id="customized-popover"
         MenuListProps={{
            'aria-labelledby': 'customized-popover',
         }}
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}
      >
         {children}
      </StyledMenu>
   );
};

export default Popover;
