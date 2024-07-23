import { statusColors } from "@/Constants";
import { GridRowModel } from "@mui/x-data-grid";
import { DatesInterface } from "@/Types";
import dayjs from "dayjs";

export const getStatusChipColor = (statusID: string | number) => {
    const key = `statusID${statusID}`;

    return statusColors[key as keyof typeof statusColors] ?? "#66CC66";
}

export const getColumnWidth = (width: number, isMobile: boolean) => {
    return {
        ...(isMobile ? { width } : { flex: 1 })
    }
}

export const getIndexedRows = (rows: GridRowModel[]) => {
    return rows.map((row, index) => ({ id: index + 1, ...row }))
}

export const getInitialDates = (): DatesInterface => {
    const format = "YYYY-MM-DD";
    const startDate = dayjs().subtract(1, 'month').format(format);
    const endDate = dayjs().format(format);

    return { startDate, endDate }
}