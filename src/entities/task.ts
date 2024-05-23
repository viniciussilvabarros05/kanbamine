import { RequestProps, status } from "./request";
import { User } from "./user";

export enum progress  {
    toDo = 1,
    progress = 2,
    finished = 3
}

export interface TaskProps{
    id: string;
    requestId: string|null;
    date: string;
    title: string;
    status:status;
    deadline: string;
    attributed: User[];
    description: string;
    progress: progress;

}