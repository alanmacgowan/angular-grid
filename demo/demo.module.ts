import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularGridModule } from '../src';
import { DemoComponent } from './demo.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [DemoComponent],
  imports: [BrowserModule, HttpModule, AngularGridModule.forRoot()],
  bootstrap: [DemoComponent]
})
export class DemoModule {}
