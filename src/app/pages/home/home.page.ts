import { Component } from '@angular/core';
import { ApplicationService } from 'src/app/service/application.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public applicationService: ApplicationService) {}
}
