import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HttpService {
  public url = environment.apiURL
  constructor(private http: HttpClient) { }

  getHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set("Authorization", "Bearer " + localStorage.getItem("todo_key"));
  }

  public getData<T>(path: String): Observable<Array<T>> {
    return this.http
      .get<T[]>(this.url + path, { 'headers': this.getHeaders() })
  }

  public getSingleData<T>(path: String): Observable<T> {
    return this.http
      .get<T>(this.url + path, { 'headers': this.getHeaders() })
  }

  public sendData<T>(path: string, data: any): Observable<T> {
    return this.http.post<T>(this.url + path, data, {
      'headers': this.getHeaders()
    })
  }

  public updateData<T>(path:string, data:any) {
    return this.http.patch<T>(this.url + path, data, {
      'headers': this.getHeaders()
    })
  }

  public deleteData(path:string) {
    return this.http.delete(this.url + path, {
      'headers': this.getHeaders()
    })
  }

  sendFormData<T>(path: string, data: Array<{ key: any, value: string }>): Observable<T> {
    const formData = new FormData()

    data.map(key => formData.append(key.key, key.value))

    return this.http.post<T>(this.url + path, formData, {
      'headers': this.getHeaders()
    })
  }
}
