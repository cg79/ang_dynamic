import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "./auth-guard.service";
import { ModuleWithProviders } from '@angular/core';
import {HomeComponent} from "../pages/home/home.component";
import {NotFoundComponent} from "../pages/not-found/notfound.component";
import {PageDesignerComponent} from "../dynamic/pages/page-designer/page-designer.component";
import {LoginComponent} from "../pages/login/login.component";
import {CustomPageRendererComponent} from "../pages/customPageRenderer/customPageRenderer.component";
import {CustomPageRendererResolve} from "../pages/customPageRenderer/customPageRendererResolve";

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'designer',
    component: PageDesignerComponent
  },
  {
    path: 'notfound',
    component: NotFoundComponent
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: CustomPageRendererComponent,
    resolve: {
      hero: CustomPageRendererResolve
    },
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false, // <-- debugging purposes only
        // preloadingStrategy: SelectivePreloadingStrategy,

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    //CanDeactivateGuard,
    //SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }

