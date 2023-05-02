import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponent } from './usuarios.component';
import { AppModule } from 'src/app/app.module';
import { UsuariosModule } from './usuarios.module';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, UsuariosModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
