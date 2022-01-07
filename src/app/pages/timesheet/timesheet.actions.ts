import { Timesheet } from 'src/app/model/Timesheet';

/**
 * Find
 */
export class FindAllTimesheet {
  static readonly type = '[TimeSheet Page] find all timesheet';
  constructor() {}
}

export class FindAllTimesheetSuccess {
  static readonly type = '[TimeSheet Page] find all timesheet success';
  constructor(public timesheet: Array<Timesheet>) {}
}

export class FindAllTimesheetError {
  static readonly type = '[TimeSheet Page] find all timesheet error';
  constructor(public error: any) {}
}

/**
 * Create
 */
export class CreateTimesheet {
  static readonly type = '[TimeSheet Page] create timesheet';
  constructor(public timesheet: Timesheet) {}
}

export class CreateTimesheetSuccess {
  static readonly type = '[TimeSheet Page] create timesheet success';
  constructor() {}
}

export class CreateTimesheetError {
  static readonly type = '[TimeSheet Page] create timesheet error';
  constructor(public error: any) {}
}

/**
 * Update
 */
export class UpdateTimesheet {
  static readonly type = '[TimeSheet Page] update timesheet';
  constructor(public timesheet: Timesheet) {}
}

export class UpdateTimesheetSuccess {
  static readonly type = '[TimeSheet Page] update timesheet success';
  constructor() {}
}

export class UpdateTimesheetError {
  static readonly type = '[TimeSheet Page] update timesheet error';
  constructor(public error: any) {}
}

export class Logout {
  static readonly type = '[TimeSheet Page] logout';
  constructor() {}
}
