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
}

@Injectable({
  providedIn: 'root',
})
export class AwsService {
  private headersObject: HttpHeaders;
  constructor(private http: HttpClient) {}
  path = 'http://ec2-54-237-91-79.compute-1.amazonaws.com:8080/';

  prepareHeader() {
    this.headersObject = new HttpHeaders();

    this.headersObject.append('Access-Control-Allow-Origin', '*');
    this.headersObject.append('Access-Control-Allow-Credentials', 'true');
    this.headersObject.append(
      'Access-Control-Allow-Methods',

      'GET, POST, PUT, DELETE, OPTIONS'
    );
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
    const completePath = this.path;

    return this.http.get<Image[]>(completePath, {
      headers: this.headersObject,
    });
  }

  uploadFiles(body: FormData) {
    const completePath = this.path + '/upload';

    return this.http.post(completePath, body, {
      headers: this.headersObject,
    });
  }

  addToTransformQueue(fileName: string) {
    const completePath = this.path + '/send-message';

    return this.http.post(completePath, fileName, {
      headers: this.headersObject,
    });
  }

  getMessage() {
    const completePath = this.path + '/get-message';

    return this.http.get(completePath, {
      headers: this.headersObject,
      responseType: 'text',
    });
  }
}
