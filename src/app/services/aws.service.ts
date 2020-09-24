import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

class Image {
  name: string;
  id: number;
  checked: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  private headersObject: HttpHeaders;
  constructor(private http: HttpClient) {}
  path = 'http://ec2-52-87-233-41.compute-1.amazonaws.com:8080/';
  prepareHeader() {
    this.headersObject = new HttpHeaders();

    this.headersObject.append('Access-Control-Allow-Origin', '*');
    this.headersObject.append('Access-Control-Allow-Credentials', 'true');
    this.headersObject.append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    this.headersObject.append(
      'Access-Control-Allow-Headers',
      'Content-Type,X-Amz-Date,Authorization,X-Api-Key'
    );
    this.headersObject.append('key', 'x-api-key');
  }

  public download(name) {
    this.prepareHeader();
    const completePath = this.path + '/d/' + name;

    return this.http.get(completePath, {
      headers: this.headersObject,
      responseType: 'text',
    });
  }

  public getFiles() {
    this.prepareHeader();
    const completePath = this.path;

    return this.http.get<Image[]>(completePath, {
      headers: this.headersObject,
    });
  }

  addToTransformQueue(fileName: string[]) {
    const completePath = this.path + '/send-message';

    return this.http.post(completePath, fileName, {
      headers: this.headersObject,
    });
  }

  awsS3Verification(fileName: string) {
    this.prepareHeader();
    const completePath = this.path + '/aws-url/' + fileName;

    return this.http.get(completePath, {
      headers: this.headersObject,
      responseType: 'text',
    });
  }

  uploadFileWithS3(url: string, body: File) {
    this.prepareHeader();
    return this.http.put(url, body, {
      headers: this.headersObject,
    });
  }
}
