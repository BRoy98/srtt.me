import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  urlData = {
    url: '',
  };

  urlSubmitting = false;
  warnMsg = '';
  localUrls = [];

  constructor(
    private networkService: NetworkService
  ) { }

  ngOnInit() {
    const localData = JSON.parse(localStorage.getItem('local_urls'));
    this.localUrls = localData === null ? [] : localData;
  }

  onUrlSubmit() {
    if (this.urlData.url.length < 1) {
      return;
    }
    this.urlSubmitting = true;
    this.networkService.newUrl(this.urlData).subscribe(
      res => {
        let localData = JSON.parse(localStorage.getItem('local_urls'));
        if (!localData) {
          localData = [];
        }
        localData.push(res);
        localStorage.setItem('local_urls', JSON.stringify(localData));
        this.localUrls = localData;
        this.urlSubmitting = false;
      },
      err => {
        this.warnMsg = err.error.error;
        this.urlSubmitting = false;
      }
    );
  }

}
