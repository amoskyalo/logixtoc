import MuiPopover from '@mui/material/Popover';

type PropsInterface = {
   anchorEl: HTMLButtonElement | HTMLDivElement | null;
   children: React.ReactNode;
   open: boolean;
   handleClose: () => void;
};

const Popover = ({ anchorEl, children, open, handleClose }: PropsInterface) => {
   return (
      <MuiPopover
         open={open}
         anchorEl={anchorEl}
         onClose={handleClose}
         anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
         }}
         sx={{ mt: 1 }}
      >
         {children}
      </MuiPopover>
   );
};

export default Popover;
