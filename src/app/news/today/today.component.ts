import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { INews } from 'src/app/interfaces/news.interface';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {

  news: INews[];
  NewsObs: Subscription;
  isActive: boolean;

  constructor(private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {
    this.news = [];
    this.isActive = true;
    this.NewsObs = this.newsService.getNewsFirebase().pipe(takeWhile(() => this.isActive)).subscribe((news: INews[]) => {
      this.news = news;
      console.log(news);
    });
  }

  addNota() {
    this.router.navigate(['/news/new']);
  }


  onUpdate(res: INews): void {
    console.log("Este deberia de ser el id de la nota", res._id)
    this.router.navigate(['/news', res._id]);
  }

  async onDelete(res: INews): Promise<void> {
    console.log("ID DE ELIMINAR --> ", res._id);
    try {
      const newDelete = await this.newsService.deleteNewsById(res._id);
      console.log('Noticia eliminada', newDelete);
    } catch (error) {
      console.log('No se pudo eliminar la noticia', error);
    }
  }
}


