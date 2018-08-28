import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppState, ILocation, CloudDevice } from '@app/definitions';
import { Store } from '@ngrx/store';
import { ActionsService } from '@services/actions.service';
import { RequestsService } from '@app/services/requests.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { NotificationService } from '@app/services/notification.service';
import { IotModuleState } from '@app/iot/iot.module.defs';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  public locations: Array<ILocation>;
  public devices: Array<CloudDevice>;

  constructor (
    public chRef: ChangeDetectorRef,
    private store: Store<IotModuleState>,
    public actions: ActionsService,
    private requests: RequestsService,
    private router: Router,
    private toasterService: ToasterService,
    private notification: NotificationService,
  ) {
    this.toasterService = toasterService;
   }
  public searchChange ($event) {
  }

  ngOnInit() {
    this.store.select('iotModule').subscribe(({locations}) => {
      this.locations = locations;
    });
    this.store.select('iotModule').subscribe(({devices}) => {
      this.devices = devices;
    });
  }

  public DeleteLocation (id: number) {
    this.requests.deleteLocation(id);
    this.notification.InvokeLocationDelete(this.locations.find(x => x.id === id));
  }
}