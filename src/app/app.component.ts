import { Component, OnInit } from '@angular/core';
import { getTokenService } from "./app.service";
import { PageEvent } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Case Study';
  case_study_questions: any = [];
  length;
  pageSize = 1;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: any = {};
  paginationPresent:boolean = true;
  thank_you_note:any='Thank you for attempting Jombay Case Study. Your responses have been recorded successfully';
  constructor(private getTokenService: getTokenService) {
    this.pageEvent['pageIndex'] = 0;
  }

  ngOnInit() {
    this.getTokenService.getAccessToken().subscribe(res => {
      this.getTokenService.beare_token = res.access_token;
      this.getDataForCaseStudy();
    }, error => {
      console.log('Erropr', error);
    })
  }

  getDataForCaseStudy() {
    if (this.getTokenService.beare_token) {
      this.getTokenService.getDataFromService().subscribe(res => {
        this.case_study_questions = res.user_company_case_study.company_case_study.questions;
        this.case_study_questions.push({
          body:this.thank_you_note
        });
        this.length = this.case_study_questions.length;
      });
    }
  }
  getPageNumber(event:any){
    return this.pageEvent === event;
  }
}
