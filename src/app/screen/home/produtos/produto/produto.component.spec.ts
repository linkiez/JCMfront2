import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoComponent } from './produto.component';
import { ProdutosModule } from '../produtos.module';
import { AppModule } from 'src/app/app.module';

describe('ProdutoComponent', () => {
  let component: ProdutoComponent;
  let fixture: ComponentFixture<ProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, ProdutosModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
