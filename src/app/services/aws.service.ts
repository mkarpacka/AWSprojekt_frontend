import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

    this.headersObject.append('Content-Type', 'application/json');

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
    const completePath = 'http://localhost:8080/';

    return this.http.get<Image[]>(completePath, {
      headers: this.headersObject,
    });
  }

  public uploadFiles(filename, file) {
    const completePath = 'http://localhost:8080/upload/' + filename;

    return this.http.put(completePath, file, {
      headers: this.headersObject,
    });
  }
}
