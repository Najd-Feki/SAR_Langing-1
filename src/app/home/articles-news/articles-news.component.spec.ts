import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesNewsComponent } from './articles-news.component';

describe('ArticlesNewsComponent', () => {
  let component: ArticlesNewsComponent;
  let fixture: ComponentFixture<ArticlesNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticlesNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticlesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
