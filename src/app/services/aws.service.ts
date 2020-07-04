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

  prepareHeader() {
    this.headersObject = new HttpHeaders();

    this.headersObject.append('Access-Control-Allow-Origin', '*');

    this.headersObject.append(
      'Access-Control-Allow-Methods',

      'GET, POST, PUT, DELETE, OPTIONS'
    );
  }

  public download(name) {
    this.prepareHeader();
    const completePath = 'http://localhost:8080/d/' + name;

    return this.http.get(completePath, {
      headers: this.headersObject,
      responseType: 'text',
    });
  }

  public getFiles() {
    const completePath = 'http://localhost:8080';

    return this.http.get<Image[]>(completePath, {
      headers: this.headersObject,
    });
  }

  uploadFiles(body: FormData) {
    const completePath = 'http://localhost:8080/upload';

    return this.http
      .post(completePath, body, {
        headers: this.headersObject,
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => console.log(error),
        () => {
          console.log('completed');
        }
      );
  }
}
