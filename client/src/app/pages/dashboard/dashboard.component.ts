import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  urlData = {
    url: '',
    shorturl: ''
  }

  public warnMsg = '';

  public urlSubmitting = false;
  public urlListLoading = false;
  public userUrls = [];

  constructor(
    private networkService: NetworkService) { }

  ngOnInit() {
    this.urlListLoading = true;
    this.networkService.getUrls().subscribe(
      res => {
        this.userUrls = res.urls;
        this.urlListLoading = false;
      },
      err => {
        // this.warnMsg = err.error;
        this.urlListLoading = false;
      }
    );
  }

  submitPress() {
    if (this.urlSubmitting)
      return;

    this.warnMsg = "";
    this.urlSubmitting = true;
    this.networkService.addUrl(this.urlData).subscribe(
      res => {
        this.userUrls.push(res.urlData);
        this.urlData.url = "";
        this.urlData.shorturl = "";
        this.urlSubmitting = false;
      },
      err => {
        this.warnMsg = err.error.error;
        this.urlSubmitting = false;
      }
    );
  }

}
