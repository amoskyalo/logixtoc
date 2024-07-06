import { statusColors } from "@/Constants";
import { useResponsiveness } from "@/hooks";
import { GridRowModel } from "@mui/x-data-grid";

export const getStatusChipColor = (statusID: string | number) => {
    const key = `statusID${statusID}`;

    return statusColors[key as keyof typeof statusColors] ?? "#66CC66";
}

export const getColumnWidth = (width: number) => {
    const { isMobile } = useResponsiveness();

    return {
        ...(isMobile ? { width } : { flex: 1 })
    }
}

export const getIndexedRows = (rows: GridRowModel[]) => {
    return rows.map((row, index) => ({ id: index + 1, ...row }))
}