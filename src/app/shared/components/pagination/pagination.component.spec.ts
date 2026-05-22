import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: any;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance as any;
    fixture.componentRef.setInput('total', 100);
    component.pageSize.set(10);
    component.pageIndex.set(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept total, pageSize, pageIndex inputs and reflect them in model signals', () => {
    expect(component.total()).toBe(100);
    expect(component.pageSize()).toBe(10);
    expect(component.pageIndex()).toBe(1);
  });

  it('should update pageSize via model', () => {
    component.pageSize.set(20);
    fixture.detectChanges();
    expect(component.pageSize()).toBe(20);
  });

  it('should update pageIndex via model', () => {
    component.pageIndex.set(3);
    fixture.detectChanges();
    expect(component.pageIndex()).toBe(3);
  });
});
