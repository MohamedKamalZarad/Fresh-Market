import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { NgxSpinnerModule } from "ngx-spinner";
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MenubarModule } from 'primeng/menubar';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorsInterceptor } from './core/interceptors/errors-interceptor';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { provideAnimations} from "@angular/platform-browser/animations";
import { provideToastr } from 'ngx-toastr';
import { toasterInterceptor } from './core/interceptors/toaster-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(),withInterceptors([headersInterceptor,errorsInterceptor,loadingInterceptor,toasterInterceptor])),
    importProvidersFrom(NgxSpinnerModule,CookieService, BrowserAnimationsModule),
    provideRouter(routes, withHashLocation()),
    provideAnimationsAsync(), providePrimeNG({
      theme: {
        preset: undefined
      }
    }),
    provideAnimations(), provideToastr()
  ]
};
