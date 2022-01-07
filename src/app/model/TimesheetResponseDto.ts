import { Timesheet } from './Timesheet';

export class TimesheetResponseDto {
  count: number;
  currentPage: number;
  items: Array<Timesheet>;
  pageSize: number;
  totalPages: number;
}
