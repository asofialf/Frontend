export class Bus {
  id: number;
  licensePlate: string;
  seatingCapacity?: number;
  totalCapacity: number;
  year: number;
  state: string;
  user: number;

  constructor(
    id: number = 0,
    licensePlate: string = '',
    seatingCapacity: number = 0,
    totalCapacity: number = 0,
    year: number = 0,
    state: string = '',
    user: number = 0,
  ) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.seatingCapacity = seatingCapacity;
    this.totalCapacity = totalCapacity;
    this.year = year;
    this.state = state;
    this.user = user;
  }
}
