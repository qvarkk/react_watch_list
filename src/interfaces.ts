export enum Status {
  Watching,
  Hold,
  Finished,
}

export interface Anime {
  id: number;
  title: string;
  status: Status;
  watched: number;
  total: number;
  notes?: string;
}
