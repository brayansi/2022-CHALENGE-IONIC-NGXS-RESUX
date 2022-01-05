import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timesheet } from 'src/app/model/Timesheet';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private endpoint = '/Timesheet';

  constructor(private genericHttpService: GenericHttpService) {}

  findOne(id: string): Observable<Timesheet> {
    return this.genericHttpService.findOne<Timesheet>(`${this.endpoint}/${id}`);
  }

  findAll(): Observable<Array<Timesheet>> {
    return this.genericHttpService.findAll<Timesheet>(`${this.endpoint}`);
  }

  create(timesheet: Timesheet): Observable<Timesheet> {
    return this.genericHttpService.create<Timesheet>(
      `${this.endpoint}`,
      timesheet
    );
  }

  update(id: string, timesheet: Timesheet): Observable<Timesheet> {
    return this.genericHttpService.update<Timesheet>(
      `${this.endpoint}/${id}`,
      timesheet
    );
  }

  delete(id: string) {
    return this.genericHttpService.delete<Timesheet>(`${this.endpoint}/${id}`);
  }
}
