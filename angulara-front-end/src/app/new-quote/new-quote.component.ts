import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms'

import {QuoteService} from '../quote.service';
import {AlertService} from '../alert.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Notification } from '../notifications/notifications.model';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {

  @ViewChild('quoteImg') quoteFileImg: any;
  quoteImg;

  constructor(private quoteService: QuoteService,
              private alertService: AlertService,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const quoteTitle = form.value.title;
    const quoteContent = form.value.content;
    const formData = new FormData();
    formData.append('quoteTitle', JSON.stringify(quoteTitle));
    formData.append('quoteContent', JSON.stringify(quoteContent));
    formData.append('quoteImg', this.quoteImg);

    this.quoteService.addQuote(formData)
      .subscribe(
        () => {
          this.notificationsService.add(new Notification('success', 'Quote successfully created!'));
          // this.alertService.success('Quote successfully created!', true)
        }
      );
    form.reset();
    this.quoteFileImg.nativeElement.value = '';
  }

  fileUpload(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.quoteImg = fileList[0];
    }
  }

}
