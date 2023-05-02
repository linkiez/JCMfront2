import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquivosComponent } from './arquivos.component';
import { AppModule } from 'src/app/app.module';
import { ArquivosModule } from './arquivos.module';

describe('ArquivosComponent', () => {
  let component: ArquivosComponent;
  let fixture: ComponentFixture<ArquivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, ArquivosModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArquivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
