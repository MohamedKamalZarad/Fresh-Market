import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
@Output() stepper :EventEmitter<number>=new EventEmitter<number>()
 @Output() search:EventEmitter<string>=new EventEmitter<string>()
 @Output() flagSend:EventEmitter<boolean>=new EventEmitter<boolean>()
 @Output() isDisabledBtnSend:EventEmitter<boolean>=new EventEmitter<boolean>()
  isDisabledBtn: boolean = true
  flag: boolean = true

    gridChange() {
    this.flag = !this.flag
    this.flagSend.emit(this.flag)
  }
  toggleDisabled() {
    this.isDisabledBtn = !this.isDisabledBtn
     this.isDisabledBtnSend.emit(this.isDisabledBtn)
  }
 @ViewChild("inputOfSearch") inputOfSearch!:ElementRef

  // searchForProduct()
  // {
  //    this.search = this.inputOfSearch.nativeElement.value

  // }
  changeStep(){
    this.stepper.emit(2)
  }
searchForProduct() {
    const value = this.inputOfSearch.nativeElement.value;
    this.search.emit(value); 
}
}
