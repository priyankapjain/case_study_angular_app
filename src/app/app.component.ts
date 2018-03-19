import { Component, OnInit, Inject } from '@angular/core';
import { getTokenService } from "./app.service";
import { PageEvent } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  thanksNoteToShow: boolean = false;
  answer: string='';
  nextBtnText: string = 'Save & Next';
  currentQuestion: any;
  title = 'Case Study';
  case_study_questions: any = [];
  paginationPresent: boolean = true;
  currentIndex: number = 0
  saveData:any=[];
  thank_you_note: any = 'Thank you for attempting Jombay Case Study. Your responses have been recorded successfully';
  constructor(private getTokenService: getTokenService,public dialog: MatDialog) {
   
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
        this.currentIndex = 0;
        this.currentQuestion = this.case_study_questions[this.currentIndex]['body'];
      });
    }
  }

  getQuestion(item, index) {
    this.currentQuestion = item['body'];
    this.currentIndex = index;
  }
  previousSlide() {
    this.currentIndex = this.currentIndex - 1;
    this.currentQuestion = this.case_study_questions[this.currentIndex]['body'];
    if(this.saveData[this.currentIndex] && this.saveData[this.currentIndex]['answer']){
      this.answer = this.saveData[this.currentIndex]['answer']?this.saveData[this.currentIndex]['answer']:'';
    }
  }
  nextSlide(answer?:any) {
    this.thanksNoteToShow = false;
    if (this.nextBtnText === 'Submit & Exit') {
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '250px',
          data: { option:true }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed',result);
          console.log('final data ',this.saveData);
          if(result){
            this.thanksNoteToShow = true;
          }
        });
      
    } else {
      this.answer = ''
      if (this.currentIndex === this.case_study_questions.length - 2) {
        this.nextBtnText = 'Submit & Exit';
      } else {
        this.saveData[this.currentIndex]={
          question:this.case_study_questions[this.currentIndex]['body'],
          answer:answer
        }
      }
      this.currentIndex = this.currentIndex + 1;
      this.currentQuestion = this.case_study_questions[this.currentIndex]['body'];
    }
  }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}