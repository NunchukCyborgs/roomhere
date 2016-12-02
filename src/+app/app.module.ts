import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './component';


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    SharedModule,
    AppRoutingModule
  ]
})
export class AppModule {
}

export { AppComponent } from './component';
