import { Component, ElementRef, HostListener, inject, input, Input, OnInit, ViewChild } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { Icon } from "../icon/icon";
import { Searchlist } from "./components/searchlist/searchlist";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'navbar',
  imports: [RouterLink, RouterLinkActive, Icon, Searchlist],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit{
  @Input() flag!:boolean
  @Input() isLogged!:boolean 
  isSearchFocused: boolean = false;
    userName:string=''
  private readonly cookiesService= inject(CookieService)
    deleteToken(){
      this.cookiesService.delete('token')
      this.router.navigate(['/login'])
    }
    goToSettings(){
         this.router.navigate(['/settings'])
    }
    private readonly router= inject(Router)
      navigate() {

 
  this.router.navigate(['search']);
  

}
  xMark: boolean = true;
  onFocus(e:Event) {
  this.isSearchFocused = true;

  
}
  onBlur(e:Event) {
    setTimeout(() => {
      
      this.isSearchFocused = false;
    },300);
    
    this.inputOfSearch.nativeElement.value=''

  
}

   search!: string
   

        @ViewChild("inputOfSearch") inputOfSearch!: ElementRef
      searchForProduct() {
    this.search = this.inputOfSearch.nativeElement.value


  } 

clearSearch() {
  this.inputOfSearch.nativeElement.value = '';
  this.search = '';
}
stopProg(e:Event){
e.stopPropagation()
}
keepOpen: boolean = false;

onInputBlur() {
 
  this.isSearchFocused = false;

}

  ngOnInit(): void {
    initFlowbite();
    this.userName= this.cookiesService.get('name')
  }
}
