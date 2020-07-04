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

  createForm() {
    this.form = this.fb.group({
      file_upload: null,
    });
  }

  onclickButton(name: string) {
    this.awsService.download(name).subscribe();
  }

  ngOnInit() {
    this.awsService.getFiles().subscribe((result) => (this.imageList = result));
  }

  fileChange(event: any) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    let body = new FormData();
    body.append('file', this.file);

    this.awsService.uploadFiles(body);
  }
}
