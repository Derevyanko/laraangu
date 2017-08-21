import {Component, OnInit} from '@angular/core';

import {NotificationsService} from './notifications.service';
import {Notification} from './notifications.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  private _notes: Notification[];

  constructor(private _notifications: NotificationsService) {
  }

  ngOnInit() {
    this._notes = new Array<Notification>();

    this._notifications.nodeAdded.subscribe(
      note => {
        this._notes.push(note);

        setTimeout(() => {
          this.hide.bind(this)(note)
        }, 3000);
      }
    );
  }

  private hide(note) {
    const index = this._notes.indexOf(note);

    if (index >= 0) {
      this._notes.splice(index, 1);
    }
  }

}
