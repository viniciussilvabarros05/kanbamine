import { progress } from "./task";

export type ImagesProps = {
  imageUrl: string;
  description: string;
  blob: File | null;
};

export enum  status {
  analyzing = 0,
  urget = 1,
  lessUrgent = 2,
  notUrgent = 3,
}
  


export type RequestProps = {
  phone: string;
  name: string;
  images: ImagesProps[];
  date: string;
  local: string;
  theme: string;
  time: string;
  description: string;
  status: status;
  progress: progress;
  event: string;
  id:string
};

export interface RequestPropsWithId extends RequestProps {
  
}

export class Request {
  request: RequestProps;
  constructor(request: RequestProps) {
    this.request = request;
  }
}
