import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../user-address/services/order.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { Orders } from './interfaces/orders';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItem } from "./components/order-item/order-item";
@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, OrderItem],
  templateUrl: './all-orders.html',
  styleUrl: './all-orders.scss',
})
export class AllOrders implements OnInit {
  orderData: Orders[] = []
  
  private readonly orderService = inject(OrderService)
  private readonly cookiesService = inject(CookieService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
decodedToken: any = jwtDecode(this.cookiesService.get('token'));
  getUserOrders() {
   
    this.orderService.getUserOrders(this.decodedToken.id)
      .subscribe(
        {
          next: (res: any) => {
            this.orderData = res
         this.orderService.orderCount.next(this.orderData.length)
            console.log(this.orderData)

          }

        }
      )
  }
navigateToOrderDetails(id:string)
{
this.router.navigate(["orders/",id])
}
  ngOnInit(): void {
    this.getUserOrders()

  }
}
