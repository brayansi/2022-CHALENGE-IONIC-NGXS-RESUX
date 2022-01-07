import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Timesheet } from 'src/app/model/Timesheet';
import { TimesheetResponseDto } from '../model/TimesheetResponseDto';
import { ApplicationService } from './application.service';
import { GenericHttpService } from './generic-http.service';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  private endpoint = '/Timesheet';

  constructor(
    private genericHttpService: GenericHttpService,
    private applicationService: ApplicationService
  ) {}

  findOne(id: string): Observable<Timesheet> {
    return this.genericHttpService.findOne<Timesheet>(`${this.endpoint}/${id}`);
  }

  findAll(): Observable<TimesheetResponseDto> {
    return this.genericHttpService.findAll<TimesheetResponseDto>(
      `${this.endpoint}`
    );
  }

  create(timesheet: Timesheet): Observable<Timesheet> {
    return this.genericHttpService.create<Timesheet>(
      `${this.endpoint}`,
      timesheet
    );
  }

  update(id: number, timesheet: Timesheet): Observable<Timesheet> {
    return this.genericHttpService.update<Timesheet>(
      `${this.endpoint}/${id}`,
      timesheet
    );
  }

  delete(id: number) {
    return this.genericHttpService.delete<Timesheet>(`${this.endpoint}/${id}`);
  }

  logout(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.applicationService.removeToken());
      }, 500);
    });
  }
}
