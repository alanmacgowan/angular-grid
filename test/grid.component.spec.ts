import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from 'chai';
import { GridComponent } from '../src/grid.component';
import { AngularGridModule } from '../src';

describe('app-grid component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularGridModule.forRoot()]
    });
  });

  // it('should say hello world', () => {
  //   const fixture: ComponentFixture<
  //   GridComponent
  //   > = TestBed.createComponent(GridComponent);
  //   fixture.detectChanges();
  //   // expect(fixture.nativeElement.innerHTML.trim()).to.equal(
  //   //   'Hello world from the angular grid module!'
  //   // );
  // });
});
