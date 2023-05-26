import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatosComponent } from './contatos.component';
import { AppModule } from 'src/app/app.module';
import { ContatosModule } from './contatos.module';

describe('ContatosComponent', () => {
  let component: ContatosComponent;
  let fixture: ComponentFixture<ContatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, ContatosModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
