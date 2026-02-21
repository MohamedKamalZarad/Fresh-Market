import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "../../../../shared/navbar/navbar";
@Component({
  selector: 'app-auth',
  imports: [RouterOutlet, Navbar],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {

}
