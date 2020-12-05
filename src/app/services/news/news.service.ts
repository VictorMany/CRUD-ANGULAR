import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { INews } from 'src/app/interfaces/news.interface';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  news: INews[] = [
    {
      id: 1,
      description: 'omar.salas@jynsystems.com',
      name: '123',
      img: 'teacher',
    },
    {
      id: 2,
      description: 'omar.salas@jynsystems.com',
      name: '123',
      img: 'teacher',
    },
    {
      id: 3,
      description: 'omar.salas@jynsystems.com',
      name: '123',
      img: 'teacher',
    },
    {
      id: 4,
      description: 'omar.salas@jynsystems.com',
      name: '123',
      img: 'teacher',
    },
    {
      id: 5,
      description: 'omar.salas@jynsystems.com',
      name: '123',
      img: 'teacher',
    },
  ];

  private newsCollection: AngularFirestoreCollection<INews>;

  constructor(
    // Para usar la clase HttpClient hay que agregar en el módulo el módulo de esta clase
    private http: HttpClient,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
  ) {
    this.newsCollection = angularFirestore.collection<INews>('news');
  }


  getNewsFirebase(): Observable<INews[]> {
    return this.newsCollection.valueChanges({ idField: '_id' });
  }

  getAllNews(): Observable<any> {
    return this.http.get(`${environment.SERVER_URL}/news/`);
  }

  getUsers(): INews[] {
    return this.news;
  }

  updateNews(id: string, news: INews): Promise<void> {
    return this.newsCollection.doc(id).update(news);
  }

  //Agrega noticias
  addNews(news: INews): Promise<DocumentReference<INews>> {
    return this.newsCollection.add(news);
  }

  //Borrar
  deleteNewsById(id: string): Promise<void> {
    return this.newsCollection.doc(id).delete();
  }

  //Obtiene por id
  getNewsById(id: string): Observable<firebase.firestore.DocumentSnapshot<INews>> {
    return this.newsCollection.doc(id).get();
  }

  //Subir imagen
  async uploadFile(path: string, data: any): Promise<any> {
    await this.angularFireStorage.upload(path, data); // (profile/my-file.png , archivo)
    return await this.angularFireStorage.ref(path).getDownloadURL().toPromise();
  }
}
