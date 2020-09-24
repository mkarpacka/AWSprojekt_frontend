import { Component, OnInit } from '@angular/core';
import { AwsService } from './services/aws.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

class Image {
  name: string;
  id: number;
  checked: boolean;
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
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

  downloadMany() {
    let imgArr = this.imageList.filter((t) => t.checked);
    if (imgArr.length > 0) {
      let result = imgArr.map((a) => a.name);
      result.forEach((e) => {
        this.download(e);
      });
    } else {
      console.log('nothing selected :<');
    }
  }

  ngOnInit() {
    this.getFiles();
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  getFiles() {
    this.awsService.getFiles().subscribe((result) => {
      this.imageList = result;
      console.log('getting all files completed');
    });
  }

  awsS3Verification() {
    if (this.file != null) {
      this.awsService.awsS3Verification(this.file.name).subscribe((r) => {
        console.log('recieved URL');
        console.log(r);

        this.awsService.uploadFileWithS3(r, this.file).subscribe((wy) => {
          console.log(wy);
          this.getFiles();
        });
      });
    }
    console.log('no file');
  }

  transformPhoto() {
    let imgArr = this.imageList.filter((t) => t.checked);
    let result = imgArr.map((a) => a.name);
    if (result.length > 0) {
      this.awsService.addToTransformQueue(result).subscribe(() => {
        console.log('adding to queue completed');
      });
    } else {
      console.log('nothing selected :<');
    }
  }
}
