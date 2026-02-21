import { Component, inject, OnInit } from '@angular/core';
import { Orders } from '../../interfaces/orders';
import { OrderService } from '../../../user-address/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { OrderItem } from "../../components/order-item/order-item";
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-order-details',
  imports: [OrderItem],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails implements OnInit {
  orderData: Orders = {} as Orders
  orderId: string = ''

  private readonly orderService = inject(OrderService)
  private readonly activatedRoute = inject(ActivatedRoute)
private readonly router= inject(Router)

  getOrderID() {
    this.orderId = this.activatedRoute.snapshot.paramMap.get('id')!
  }

    getAnOrder() {
    this.orderService.getAnOrder(this.orderId)
      .subscribe(
        {
          next: (res: any) => {
            this.orderData = res.data
            console.log(this.orderData)

          }

        }
      )
  }
  navigateToProductDetails(id:string) {

  this.router.navigate(['product/'+id]);

}
  ngOnInit(): void { 
    this.getOrderID()
      this.getAnOrder()
  }
}
