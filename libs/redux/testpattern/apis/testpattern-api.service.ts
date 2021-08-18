import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import * as TestCallModels from '../models';


export interface ITestCallApiService {
    getTestCall(): Observable<TestCallModels.TestCall[]>;
  }

@Injectable({ providedIn: 'root' })
export class TestCallApiService implements ITestCallApiService {

  private _baseUrl;

  constructor(private http: HttpClient,
  ) {
    this._baseUrl = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
  }

  getTestCall(): Observable<TestCallModels.TestCall[]> {
    console.log("Api Hit");
    const httOptions = this.getHttpHeader();
    return this.http.get(this._baseUrl, {headers: httOptions.headers, observe: httOptions.observe})
        .pipe(
            map((data: any) => {
                const temp = this.proccessResponseData(data);
                console.log("Api return",temp);
                console.log("Api return results",temp.Results);
                return temp.Results;
            }),
            catchError(this.handleError)
        )
  }

  private getHttpHeader(responsType?: string) {
    let httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
          }),
        observe: 'response' as 'body',
        responseType: ''
      };
    if(responsType) httpOptions.responseType = responsType;
    return httpOptions;
  }

  private getSoftErrorMessage(status?: string, statusText?: string) {
    return 'Error ' + status + ': ' + statusText;
  }

  private isDataAccepted(data: any) {
    return data.status == "200";
  }

  private proccessResponseData(data: any) {
    if(this.isDataAccepted(data)) {
        return data.body;
    } else {
        throw this.getSoftErrorMessage(data.status, data.statusText);
    }
  }

  handleError(error: any): Observable<any> {
    if (error.status) {
        return observableThrowError(error);
    } else {
        let errorCode = error.status;
        let errorStatusText = error.statusText;
        let errorMessage = 'Error : ' + errorCode + ' ' + errorStatusText;
        console.error(errorMessage);
        // for demo purposes only
        return observableThrowError(new Error(errorMessage) || error); // Promise.reject(error.message || error);
    }
  }

}
