export class Schedule {
  id: number;
  date: number;
  description: number;
  user: string;
  isDeleted: boolean;

  constructor(
    id: number = 0,
    date: number = 0,
    description: number = 0,
    user: string = '',
    isDeleted: boolean = false
  ) {
    this.id = id;
    this.date = date;
    this.description = description;
    this.user = user;
    this.isDeleted = isDeleted;
  }
}
