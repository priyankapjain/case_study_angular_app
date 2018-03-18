import { Injectable } from "@angular/core";
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import "rxjs/Rx";
import { Observable } from "rxjs";
import {configData} from "./config";
@Injectable()
export class getTokenService {

    public access_token_url:any='https://simulationapi.ur-nl.com/oauth/token.json';
    public case_study_url:any='https://simulationapi.ur-nl.com/case_study/companies/58cba141ba169e0eab2657c9/company_case_studies/595c859eba169ec47e4f20d4/user_company_case_studies/595ce021ba169edb9c733e90?include[company_case_study][include]=questions'
    public beare_token:any='';

    constructor(private http: Http) {

    }

    public getAccessToken():any{
        let headers = new Headers({
            "Content-Type": "application/x-www-form-urlencoded"
           
          //  "Authorization": "Basic " + btoa(configData.client_id + ':' + configData.client_secret)
        });

        let options = new RequestOptions({ headers: headers });

        let data =  "grant_type=password&" + "&scope=user&" +
            "client_secret="+configData.client_secret+"&client_id="+configData.client_id+"&auth_token="+configData.auth_token;

        return this.http.post(this.access_token_url, data, options)
            .map(res => res.json());
    }


    public getDataFromService():any{
        let headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " +this.beare_token
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.case_study_url, options)
            .map(res => res.json());
    }


}