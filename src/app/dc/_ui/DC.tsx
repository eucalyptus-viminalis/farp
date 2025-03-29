import { Reaction } from "./FullDC";


export type DC = {
    txt: string;
    timeDisplay: string;
    isSelfDC: boolean;
    unix?: string;
    replyTo?: DC;
    reactions?: Reaction[];
};
