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

  /**
   * This is the method that find  one the timesheet
   *
   * @param id timesheet id
   * @param timesheet timesheet data
   */
  findOne(id: string): Observable<Timesheet> {
    return this.genericHttpService.findOne<Timesheet>(`${this.endpoint}/${id}`);
  }

  /**
   * This is the method that update find all timesheet
   *
   * @param id timesheet id
   * @param timesheet timesheet data
   */
  findAll(): Observable<TimesheetResponseDto> {
    return this.genericHttpService.findAll<TimesheetResponseDto>(
      `${this.endpoint}`
    );
  }

  /**
   * This is the method that create the timesheet
   *
   * @param id timesheet id
   * @param timesheet timesheet data
   */
  create(timesheet: Timesheet): Observable<Timesheet> {
    return this.genericHttpService.create<Timesheet>(
      `${this.endpoint}`,
      timesheet
    );
  }

  /**
   * This is the method that update the timesheet
   *
   * @param id timesheet id
   * @param timesheet timesheet data
   */
  update(id: number, timesheet: Timesheet): Observable<Timesheet> {
    return this.genericHttpService.update<Timesheet>(
      `${this.endpoint}/${id}`,
      timesheet
    );
  }

  /**
   * This is the method that remove the timesheet
   *
   * @param id timesheet id
   */
  delete(id: number) {
    return this.genericHttpService.delete<Timesheet>(`${this.endpoint}/${id}`);
  }

  /**
   * This is the method that logs out.
   */
  logout(): Observable<boolean> {
    return new Observable<boolean>((subscriber) => {
      setTimeout(() => {
        subscriber.next(this.applicationService.removeToken());
      }, 500);
    });
  }
}
