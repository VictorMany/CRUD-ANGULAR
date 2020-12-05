import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  // Definición del grupo de controles
  form: FormGroup;
  // Valida si es un nuevo maestro
  isNew: boolean;
  // Params
  params: Params;
  // Profile image
  img = 'https://firebasestorage.googleapis.com/v0/b/salle-app-592bb.appspot.com/o/pngfind.com-marshmello-png-2193391.png?alt=media&token=23b5177a-b6af-40f6-b6cb-9a613c2c518c';
  file: File;
  meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
  f = new Date();
  fecha = ""
  constructor(
    private newsService: NewsService, // Servicio de usuarios
    private router: Router, // Clase para hacer la navegación
    private activatedRoute: ActivatedRoute, // Obtener los parámetros de la url
  ) { }

  ngOnInit(): void {
    // Inicializar variables
    this.isNew = true;
    this.file = null;

    // Instancia del grupo de controles
    this.form = new FormGroup({
      // Definición de cada uno de los controles
      // (valor inicial, validaciones síncronas, validaciones asíncronas)
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });

    // Obtener los parámetros de la url
    this.activatedRoute.params.subscribe(
      async (params: Params) => {
        this.params = params;
        this.isNew = params.newId === 'new' ? true : false;
        await this.iniValuesHttp();
      }, // Next
      (error: any) => {
        console.log('Error parámetros: ', error);
      }, // Error
      () => { } // Complete
    );

    // this.iniValuesHttp();
  }

  async iniValuesHttp(): Promise<void> {
    try {
      if (!this.isNew) {
        const news = await this.newsService.getNewsById(this.params.newId).toPromise();
        console.log("NOTICIA A ACTUALIZAR", news.data())
        if (news.data()) {
          this.form = new FormGroup({
            name: new FormControl(news.data().name, [Validators.required, Validators.email]),
            description: new FormControl(news.data().description, [Validators.required]),
          });
          this.img = news.data().img ? news.data().img : this.img;
        }
      } else {
        this.form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Método que agrega un usuario en firebase
   */
  async onAdd(): Promise<void> {
    this.fecha = (this.f.getDate() + " de " + this.meses[this.f.getMonth()] + " de " + this.f.getFullYear());
    console.log(this.form);
    if (this.form.valid) {
      const firebaseResponse = await this.newsService.addNews({ ...this.form.value, date: this.fecha });
      const news = await firebaseResponse.get();
      let path = null;
      if (this.file) {
        path = await this.newsService.uploadFile(`profile/${this.file.name}`, this.file);
        await this.newsService.updateNews(news.id, { ...news.data(), img: path ? path : this.img });
      }
      this.file = null;
      path = null;
      this.router.navigate(['/', 'news', 'today']);
    } else {
      console.log('El formulario es inválido');
    }
  }

  GoHome() {
    this.router.navigate(['/news/today'])
  }

  /**
   * Método que actualiza un usuario en firebase
   */
  async onUpdate(): Promise<void> {
    this.fecha = (this.f.getDate() + " de " + this.meses[this.f.getMonth()] + " de " + this.f.getFullYear());
    try {
      let path = null;
      if (this.file) {
        path = await this.newsService.uploadFile(`profile/${this.file.name}`, this.file);
      }
      await this.newsService.updateNews(this.params.newId, { ...this.form.value, img: path ? path : this.img, date: this.fecha });
      this.router.navigate(['/', 'news', 'today']);
    } catch (error) {
      console.log(error);
    } finally {
      this.file = null;
    }
  }

  /**
   * Método que obtiene un archivo
   * @param event Evento para obtener el archivo seleccionado por el usuario
   */
  async onChange(event: any): Promise<any> {
    const files: any[] = event.target.files;
    if (files.length > 0) {
      this.file = files[0];
      this.img = await this.getBase64(files[0]);
      // const url = await this.newsService.uploadFile(`profile/${files[0].name}`, files[0]);
      // this.img = url;
    } else {
      console.log('No selecciono un archivo');
    }
  }

  /**
   * Método que convierte un archivo a base64
   * @param file Archivo
   */
  getBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
}







