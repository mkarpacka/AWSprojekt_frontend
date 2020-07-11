import { Component, OnInit } from '@angular/core';
import { AwsService } from './services/aws.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  imageList: Array<Image>;
  selectedFiles: FileList;
  file: File;

  form: FormGroup;

  constructor(private fb: FormBuilder, private awsService: AwsService) {}

  download(name: string) {
    this.awsService
      .download(name)
      .subscribe(() => console.log('downloading completed'));
  }

  transformPhoto(name: string) {
    this.awsService.addToTransformQueue(name).subscribe(() => {
      console.log('adding to queue completed');
      this.getFiles();
    });
  }

  ngOnInit() {
    this.getFiles();
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    let body = new FormData();
    body.append('file', this.file);

    this.awsService.uploadFiles(body).subscribe(() => {
      console.log('upload completed');
      this.getFiles();
    });
  }

  getFiles() {
    this.awsService.getFiles().subscribe((result) => {
      this.imageList = result;
      console.log('getting all files completed');
    });
  }

  getMessage() {
    this.awsService.getMessage().subscribe(() => {
      console.log('running getting messages');
    });
  }
}
