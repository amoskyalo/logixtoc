import { SvgIconComponent } from "@mui/icons-material";

export type CardsInterface = {
    title: string;
    subTitle: string;
    color: string;
    iconBackground: string;
    cardBackground?: string;
    Icon: SvgIconComponent;
    percentages: { text: string, value: number }[];
}

export type ContainerInterface = {
    title: string;
    children: React.ReactNode;
    renderActionButton?: () => React.ReactNode;
};