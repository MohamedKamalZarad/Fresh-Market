import { Component ,Input, ɵNavigationTypeString} from '@angular/core';
import { FormControl,ReactiveFormsModule, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class MYInput {
@Input() control :any
@Input() type !: string
@Input() id !: string




}
