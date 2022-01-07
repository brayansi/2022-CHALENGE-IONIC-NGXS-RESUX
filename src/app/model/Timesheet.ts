export class Timesheet {
  constructor(
    public id: number | null,
    public start: string | Date,
    public startLunch: string | Date,
    public endLunch: string | Date,
    public end: string | Date
  ) {}
}
