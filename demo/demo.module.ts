import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularGridModule } from '../src';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, AngularGridModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
