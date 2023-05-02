import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosComponent } from './produtos.component';
import { AppModule } from 'src/app/app.module';
import { ProdutosModule } from './produtos.module';

describe('CadastroProdutosComponent', () => {
  let component: ProdutosComponent;
  let fixture: ComponentFixture<ProdutosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, ProdutosModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
