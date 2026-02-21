import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap, catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
export const toasterInterceptor: HttpInterceptorFn = (req, next) => {

  const toastr = inject(ToastrService);

  return next(req).pipe(

tap((event: any) => {
  if ((req.method === 'PUT' || req.method === 'POST') && event?.body?.message) {
    toastr.success(event.body.message,'',{
      timeOut: 1500

    });
    
  }
if(req.method === 'Delete' && event?.body?.message)
  {
   toastr.remove(event.body.message);
  }
}),

    catchError((error) => {

 
        toastr.error('Something went wrong');
      

      return throwError(() => error);
    })

  );
};
