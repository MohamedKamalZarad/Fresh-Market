import { DatePipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-order-item',
  imports: [DatePipe],
  templateUrl: './order-item.html',
  styleUrl: './order-item.scss',
})
export class OrderItem {
  @Input() imageCover!: string
  @Input() orderId!: number
  @Input() createdAt!: string | Date
  @Input() paidAt!: string| undefined | Date
  @Input() paymentMethodType!: string
  @Input() city!: string
  @Input() shippingAddress!: any
  @Input() userPhone!: string
  @Input() isDelivered!: boolean
  @Input() isPaid!: boolean
  @Input() updatedAt!: string| Date
  @Input() shippingPrice!: number
  @Input() taxPrice!: number
  @Input() totalOrderPrice!: number
  private readonly router = inject(Router)
  private readonly cookiesService = inject(CookieService)
  decodedToken: any = jwtDecode(this.cookiesService.get('token'));
  navigateToOrderDetails() {
    this.router.navigate(["orders/", this.decodedToken.id])
  }
}
