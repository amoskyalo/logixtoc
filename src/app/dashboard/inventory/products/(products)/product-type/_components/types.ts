export type PropsInterface<R> = {
   rows: R[];
   onClose: () => void;
   open: boolean;
};
