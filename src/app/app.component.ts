import { Component, OnInit } from '@angular/core';
import { AwsService } from './services/aws.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';

class Image {
  name: string;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Project';
  imageList: Array<Image>;
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(private awsService: AwsService) {}

  onclickButton(name: string) {
    this.awsService.download(name).subscribe();
  }

  uploadClicked() {
    this.awsService.download(this.title).subscribe();
  }

  submit() {
    this.awsService
      .uploadFiles('test1.txt', this.currentFileUpload)
      .subscribe();
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  ngOnInit() {
    this.awsService.getFiles().subscribe((result) => (this.imageList = result));
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.awsService
      .uploadFiles('test1.txt', this.currentFileUpload)
      .subscribe((event) => {
        console.log(event.toString);
        this.selectedFiles = undefined;
      });
  }
}
