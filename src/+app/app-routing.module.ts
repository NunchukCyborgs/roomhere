import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PropertyViewResolve } from './+property-view/property-resolve.service';
import { MissingResource } from './shared/components/missing-resource/component';

export function getGeneralModule() {
  return System.import('./+general/general.module' + (process.env.AOT ? '.ngfactory' : ''))
    .then(mod => mod[(process.env.AOT ? 'GeneralModuleNgFactory' : 'GeneralModule')]);
}
export function getWelcomeModule() {
  return System.import('./+welcome/welcome.module' + (process.env.AOT ? '.ngfactory' : ''))
    .then(mod => mod[(process.env.AOT ? 'WelcomeModuleNgFactory' : 'WelcomeModule')]);
}
export function getAccountModule() {
  return System.import('./+account/account.module' + (process.env.AOT ? '.ngfactory' : ''))
    .then(mod => mod[(process.env.AOT ? 'AccountModuleNgFactory' : 'AccountModule')]);
}
export function getPropertyViewModule() {
  return System.import('./+property-view/property-view.module' + (process.env.AOT ? '.ngfactory' : ''))
    .then(mod => mod[(process.env.AOT ? 'PropertyViewModuleNgFactory' : 'PropertyViewModule')]);
}

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', loadChildren: getWelcomeModule },
      { path: 'p', loadChildren: getGeneralModule },
      { path: 'account', loadChildren: getAccountModule },
      { path: 'cape-girardeau/:slug', loadChildren: getPropertyViewModule, resolve: { property: PropertyViewResolve } },
      { path: '**', component: MissingResource },
    ])
  ],
})
export class AppRoutingModule { }
