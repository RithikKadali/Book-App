import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { book } from '../book';
import { GoogleApisService } from '../google-apis.service';
import { RouterserviceService } from '../routerservice.service';
import { error } from '@angular/compiler/src/util';
import { InternalService } from '../internal.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  mypic:String;
  booksearch: FormGroup;
  title: FormControl;
  book1: book = new book;
  //for fav
  bid: number;
  //array for storing
  result: Array<any> = [];
  arr1: Array<any> = [];
  arr1storing: Array<any> = [];
  arrSplit: Array<any> = [];
  finalArray: Array<any> = [];
  arr1printing: Array<any> = [];
  arr2printing: Array<any> = [];
  arr2: Array<any> = [];
  filteredOptions: Observable<string[]>;
  //local book variables---
  bookId: string;
  bookTitle: string;
  bookAuthors: string[];
  bookPublisher: string;
  bookPublishedDate: string;
  bookDescription: string;
  bookCategory: string;
  bookImage: any;
  bookPrice: string;
  bookLanguage: string;
  bookCurrencytCode: string;
  username1: string;
  username: string;
  input:string;
  string0:string;
  constructor(private googleserv: GoogleApisService, private routerService: RouterserviceService,
    private internalservice:InternalService) { }
    // private _filter(value: string): string[] {
    //   const filterValue = value.toLowerCase();
  
    //   return this.internalservice.getArray().filter(option => option.toLowerCase().includes(filterValue));
    // }
  ngOnInit() {
    this.mypic = localStorage.getItem("x");
    this.title = new FormControl('', Validators.required);
    this.booksearch = new FormGroup({
      title: this.title
    });

    // this.filteredOptions = this.title.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );

    this.arr1printing = [];
    //this.routerService.tosearch();
    console.log("search2");
    this.input=this.internalservice.getInput();
    this.googleserv.getDetails(this.input).subscribe(
      data => {
        this.arr1 = data;
        for (let i = 0; i < this.arr1['items'].length; i++) {
          this.arr1storing['bookId'] = this.arr1['items'][i]['id'];
          this.arr1storing['bookTitle'] = this.arr1['items'][i]['volumeInfo']['title'];
          this.arr1storing['bookPublisher'] = this.arr1['items'][i]['volumeInfo']['publisher']
          this.arr1storing['bookPublishedDate'] = this.arr1['items'][i]['volumeInfo']['publishedDate'];
          this.arr1storing['bookDescription'] = this.arr1['items'][i]['volumeInfo']['description'];
          // this.string0 = this.arr1['items'][i]['volumeInfo']['description'];
          // console.log(this.string0);
          //     this.arrSplit = this.string0.split(".|,");
          //     console.log(this.arrSplit);
          //     for (let i = 0; i < 1; i++) {
          //       this.finalArray.push(this.arrSplit[i]);
          //     }
          //     console.log(this.finalArray);
          //     this.arr1storing['textSnippet'] = this.finalArray;
            
            
          if (this.arr1['items'][i]['volumeInfo']['categories'] != undefined) {
            this.arr1storing['bookCategory'] = this.arr1['items'][i]['volumeInfo']['categories'][0];
          }
          if(this.arr1['items'][i]['volumeInfo']['imageLinks']!=undefined)
          {
            this.arr1storing['bookImage'] = this.arr1['items'][i]['volumeInfo']['imageLinks']['thumbnail'];
          }
          else{
            this.arr1storing['bookImage']='-'
          }
          
          if (this.arr1['items'][i]['volumeInfo']['listPrice'] != undefined) {
            this.arr1storing['bookPrice'] = this.arr1['items'][i]['volumeInfo']['listPrice']['amount'];
            this.arr1storing['bookCurrencytCode'] = this.arr1['items'][i]['volumeInfo']['listPrice']['currencyCode'];
          }
          // this.arr1storing['bookLanguage'] = this.arr1['items'][i]['volumeInfo']['language'];
          if (this.arr1['items'][i]['volumeInfo']['language'] != undefined) {
            if (this.arr1['items'][i]['volumeInfo']['language'] == "en") {
              this.arr1storing['bookLanguage'] = "English";
            }
            if (this.arr1['items'][i]['volumeInfo']['language'] == "fr") {
              this.arr1storing['bookLanguage'] = "French";
            }
            if (this.arr1['items'][i]['volumeInfo']['language'] == "de") {
              this.arr1storing['bookLanguage'] = "German";
            }
            if (this.arr1['items'][i]['volumeInfo']['language'] == "ms") {
              this.arr1storing['bookLanguage'] = "Malaysian";
            }
          }
          // this
          this.arr1storing['author'] = this.arr1['items'][i]['volumeInfo']['authors'];
          this.arr1printing.push(this.arr1storing);
          this.arr1storing = [];
        }
        console.log(this.arr1printing);
      }
    );



  }
  //searching for books-----------
  search() {
    this.arr1printing = [];
    //this.routerService.tosearch();
    console.log("search");

    this.googleserv.getDetails(this.booksearch.value).subscribe(
      data => {
        this.arr1 = data;

       
      
        for (let i = 0; i < this.arr1['items'].length; i++) {
          if (this.arr1['items'][i]['id'] != undefined) {
            this.arr1storing['bookId'] = this.arr1['items'][i]['id'];
          }
          else {
            this.arr1storing['bookId'] = "-";
          }
          if (this.arr1['items'][i]['volumeInfo']['title'] != undefined) {
            this.arr1storing['bookTitle'] = this.arr1['items'][i]['volumeInfo']['title'];

          }
          else {
            this.arr1storing['bookTitle'] = "-";
          }
          if (this.arr1['items'][i]['volumeInfo']['publisher'] != undefined) {
            this.arr1storing['bookPublisher'] = this.arr1['items'][i]['volumeInfo']['publisher'];
          }
          else {
            this.arr1storing['bookPublisher'] = "-";
          }



          if (this.arr1['items'][i]['volumeInfo']['publishedDate'] != undefined) {
            this.arr1storing['bookPublishedDate'] = this.arr1['items'][i]['volumeInfo']['publishedDate'];
          }
          else {
            this.arr1storing['bookPublishedDate'] = "-";
          }
          // this.date=[];
          if (this.arr1['items'][i]['volumeInfo']['description'] != undefined) {
            this.arr1storing['bookDescription'] = this.arr1['items'][i]['volumeInfo']['description'];
          }
          else {
            this.arr1storing['bookDescription'] = "-";
          }
          if (this.arr1['items'][i]['volumeInfo']['categories'] != undefined) {
            this.arr1storing['bookCategory'] = this.arr1['items'][i]['volumeInfo']['categories'][0];
          }
          else {
            this.arr1storing['bookCategory'] = "-";
          }
          if (this.arr1['items'][i]['volumeInfo']['imageLinks']['thumbnail']) {
            this.arr1storing['bookImage'] = this.arr1['items'][i]['volumeInfo']['imageLinks']['thumbnail'];
          }
          else {
            this.arr1storing['bookImage'] = "-";
          }

          if (this.arr1['items'][i]['volumeInfo']['listPrice'] != undefined) {
            this.arr1storing['bookPrice'] = this.arr1['items'][i]['volumeInfo']['listPrice']['amount'];
            this.arr1storing['bookCurrencytCode'] = this.arr1['items'][i]['volumeInfo']['listPrice']['currencyCode'];
          }
          else {
            this.arr1storing['bookCurrencytCode'] = "-";
          }
          if (this.arr1['items'][i]['volumeInfo']['language'] != undefined) {
            if (this.arr1['items'][i]['volumeInfo']['language'] == "en") {
              this.arr1storing['bookLanguage'] = "English";
            }
            if (this.arr1['items'][i]['volumeInfo']['language'] == "fr") {
              this.arr1storing['bookLanguage'] = "French";
            }
            if (this.arr1['items'][i]['volumeInfo']['language'] == "de") {
              this.arr1storing['bookLanguage'] = "German";
            }
            if (this.arr1['items'][i]['volumeInfo']['language'] == "ms") {
              this.arr1storing['bookLanguage'] = "Malaysian";
            }
          }
          // this.arr1storing['bookLanguage'] = this.arr1['items'][i]['volumeInfo']['language'];
          //
          if (this.arr1['items'][i]['volumeInfo']['previewLink'] != undefined) {
            this.arr1storing['preview'] = this.arr1['items'][i]['volumeInfo']['previewLink'];
          }
          else {
            this.arr1storing['preview'] = "-";
          }
          if (this.arr1['items'][i]['volumeInfo']['authors'] != undefined) {
            this.arr1storing['author'] = this.arr1['items'][i]['volumeInfo']['authors'];
          }
          else {
            this.arr1storing['author'] = "-";
          }
          this.arr1printing.push(this.arr1storing);
          this.arr1storing = [];
        }

        console.log(this.arr1printing);
        this.internalservice.setArray(this.arr1printing);


      }
    )
  }
  
 



  search1(input) {
    console.log(input);
    this.internalservice.setInput(input);
    this.ngOnInit();

    
  }
  //view my recommendations
  viewMyRecom() {
    console.log("inside view my recomm");
    this.routerService.tomyrecommendation();
  }
}
