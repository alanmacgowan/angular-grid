import { Component } from '@angular/core';

@Component({
  selector: 'app-hello-world',
  template: 'Hello world from the {{ projectTitle }} module!'
})
export class HelloWorldComponent {
  projectTitle: string = 'angular grid';
}
