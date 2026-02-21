import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-diff-ui',
  imports: [ReactiveFormsModule],
  templateUrl: './input-diff-ui.html',
  styleUrl: './input-diff-ui.scss',
})
export class InputDiffUI {
@Input() control!:any
@Input() type!:string
@Input() inputId!:string
@Input() lablel!:string
@Input() isDisabled:boolean=true


}
