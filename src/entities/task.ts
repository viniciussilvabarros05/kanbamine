export enum progress  {
    toDo = 1,
    progress = 2,
    finished = 3
}

export interface TaskProps{
    id: string;
    requestId: string;
    data: string;
    title: string;
    deadline: string;
    attributed: string;
    description: string;
    progress: progress;

}