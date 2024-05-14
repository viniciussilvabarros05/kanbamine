export type ImagesProps = {
  imageUrl: string;
  description: string;
  blob: File | null;
};

export enum  status {
  toDo = 0,
  playing = 1,
  finished = 2,
}
  


export type RequestProps = {
  phone: string;
  name: string;
  images: ImagesProps[];
  date: string;
  objective: string;
  theme: string;
  time: string;
  description: string;
  status: status;
  urgency?: string;
};

export interface RequestPropsWithId extends RequestProps {
  id: string;
}

export class Request {
  request: RequestProps;
  constructor(request: RequestProps) {
    this.request = request;
  }
}
