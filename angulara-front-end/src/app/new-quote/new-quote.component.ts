import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {QuoteService} from '../quote.service';
import {AlertService} from '../alert.service';
import {RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {

  @ViewChild('photo') photo;

  constructor(private quoteService: QuoteService, private alertService: AlertService) {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const f = this.photo.nativeElement;
    const quoteTitle = form.value.title;
    const quoteContent = form.value.content;
    const quoteFile = f.files[0];

    this.quoteService.addQuote(quoteTitle, quoteContent, quoteFile)
      .subscribe(
        () => this.alertService.success("Quote successfully created!", true)
      );
    form.reset();
  }

  /*fileUpload(event) {
    let fileList: FileList = event.target.files;
    console.log('photo ', fileList);
    /!*if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('photo', file, file.name);



      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization','Bearer ' + localStorage.token );

      let options = new RequestOptions({ headers: headers });
      this.http.post(url, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
          data => console.log('fileUpload success'),
          error => console.log(error)
        )
    }*!/
  }*/

}
