import { Component, ElementRef, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
  @Input() flag:boolean =true
}
