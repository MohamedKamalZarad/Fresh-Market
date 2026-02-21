import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Address } from '../../../../interfaces/user-info';

@Component({
  selector: 'app-address-card',
  imports: [],
  templateUrl: './address-card.html',
  styleUrl: './address-card.scss',
})
export class AddressCard {
@Input() addressItem !:Address

}
