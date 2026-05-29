import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements AfterViewInit {
  data: any;
  @ViewChild('tituloHome', { read: ElementRef }) tituloHome!: ElementRef;
  @ViewChild('inputNombre', { read: ElementRef }) inputNombre!: ElementRef;
  @ViewChild('inputApellido', { read: ElementRef }) inputApellido!: ElementRef;

  nombre: string = '';
  apellido: string = '';
  educacion: string = '';
  fechaNacimiento: any = null;

  constructor(
    private activeRoute: ActivatedRoute, 
    private router: Router,
    private alertController: AlertController,
    private animationCtrl: AnimationController
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      if(this.router.currentNavigation()?.extras.state) {
        this.data = this.router.currentNavigation()?.extras?.state?.['user'];
        console.log(this.data);
      }
      else {
        this.router.navigate(["/login"]);
      }
    });
  }

  ngAfterViewInit() {
    const animacionTitulo = this.animationCtrl.create()
      .addElement(this.tituloHome.nativeElement)
      .duration(1200)
      .iterations(1)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'scale(0.8)', 'scale(1)');

    animacionTitulo.play();
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.educacion = '';
    this.fechaNacimiento = null;

    const animacionNombre = this.animationCtrl.create()
      .addElement(this.inputNombre.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 0.5, transform: 'translateX(25px)' },
        { offset: 1, transform: 'translateX(0px)' }
      ]);

    const animacionApellido = this.animationCtrl.create()
      .addElement(this.inputApellido.nativeElement)
      .duration(1000)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateX(0px)' },
        { offset: 0.5, transform: 'translateX(25px)' },
        { offset: 1, transform: 'translateX(0px)' }
      ]);

    animacionNombre.play();
    animacionApellido.play();
  }

  async mostrarAlerta() {
    const textoAlerta = this.nombre && this.apellido 
      ? `Su nombre es ${this.nombre} ${this.apellido}`
      : 'Por favor, ingresa tu nombre y apellido primero.';

    const alert = await this.alertController.create({
      header: 'Información',
      message: textoAlerta,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
