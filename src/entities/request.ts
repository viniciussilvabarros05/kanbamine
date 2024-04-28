export type ImagesProps = {
  imageUrl: string;
  description: string;
  blob: File | null;
};

export type RequestProps = {
  id?: string;
  phone: string;
  name: string;
  images: ImagesProps[];
  date: string;
  objective: string;
  theme: string;
  description: string;
  status?: string;
  urgency?: string;
};

export class Request {
  request: RequestProps;
  constructor(request: RequestProps) {
    this.request = request;
  }
}
