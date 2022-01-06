export class FindAllTimesheet {
  static readonly type = '[TimeSheet Page] find all timesheet';
  constructor() {}
}

export class FindAllTimesheetSuccess {
  static readonly type = '[TimeSheet Page] find all timesheet success';
  constructor() {}
}

export class FindAllTimesheetError {
  static readonly type = '[TimeSheet Page] find all timesheet error';
  constructor(public error: any) {}
}

export class Logout {
  static readonly type = '[TimeSheet Page] logout';
  constructor() {}
}
