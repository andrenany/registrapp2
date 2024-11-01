import { Component } from '@angular/core';
// Importamos lo necesario
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController, ToastController, AnimationController } from '@ionic/angular';
import { EstadoService } from 'src/app/services/estado.service';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage {
  email: any;
  formulario: FormGroup; // Formulario de Angular para manejar la entrada de datos
  showCalendar: boolean = false; // Variable para mostrar/ocultar el calendario
  contador: number = 0; // Contador para manejar el estado de EstadoService


    //para usar el codigo
    barcodes = [];
    NumFac: string;

  constructor(
    public authService: AuthService,
    public ToastController: ToastController,
    private router: Router,
    private animationCtrl: AnimationController, // Controlador de animaciones
    private estadoService: EstadoService,
    public alertController: AlertController,
    public LoadingController: LoadingController,
    private formBuilder: FormBuilder // Inyectamos el FormBuilder para crear el formulario
  ) {
    // Inicializamos el formulario con validaciones en los campos
    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nivelEducacion: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Saluda al usuario al iniciar la página y obtiene su perfil de autenticación
    this.authService.getProfile()
      .then(user => {
        this.email = user?.email;
        console.log(user?.email);
      })
      .catch(error => {
        console.error('Error getting user profile:', error);
      });

    // Muestra el valor actual del contador cuando cambia
    this.estadoService.contadorActual.subscribe(valor => {
      this.contador = valor;
      console.log('ngOnInit: Contador Actualizado', this.contador);
    });
  }

  // Método para cerrar sesión
  signOut() {
    this.authService.signOut().then(() => {
      this.router.navigate(['/landing']);
    });
  }

  // Método para animar un botón
  animarBoton() {
    const boton = document.querySelector('.boton-animado');
    if (boton) {
      const animacion = this.animationCtrl.create()
        .addElement(boton)
        .duration(500)
        .fromTo('transform', 'scale(1)', 'scale(1.2)')
        .fromTo('background-color', '#000000', '#ff5722');
      animacion.play();
    } else {
      console.error("No existe la clase .boton-animado");
    }
  }

  // Método para animar una tarjeta
  animarTarjeta() {
    const tarjeta = document.querySelector('.tarjeta-animada');
    if (tarjeta) {
      const animacion = this.animationCtrl.create()
        .addElement(tarjeta)
        .duration(1000)
        .fromTo('transform', 'translateX(-100%)', 'translate(0%)')
        .fromTo('opacity', '0', '1');
      animacion.play();
    } else {
      console.error("No existe la clase .tarjeta-animada");
    }
  }

  // Método para limpiar el formulario
  limpiar() {
    this.formulario.reset();
  }

  // Navega a la página de inicio de sesión
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Muestra una alerta con los datos ingresados si el formulario está completo
  async mostrar() {
    if (this.formulario.invalid) { // Verifica si el formulario es válido
      const alert = await this.alertController.create({
        header: 'Formulario Incompleto',
        message: 'Por favor, complete todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    const formData = this.formulario.value; // Obtiene los valores del formulario
    const alert = await this.alertController.create({
      header: 'Datos Ingresados',
      message: `Nombre: ${formData.nombre}\nApellido: ${formData.apellido}\nNivel Educación: ${formData.nivelEducacion}\nFecha Nacimiento: ${formData.fechaNacimiento}`,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

   // Navega a la página de agenda
   navigateToagenda() {
    this.router.navigate(['/agenda']);
  }

  //para usar el codigo del escaner
  //async scan() {
    //try {
      //const options = { hig}; // Puedes agregar opciones si lo necesitas
      //const result = await CapacitorBarcodeScanner.scanBarcode(options);
  
      // Imprimir el resultado completo del escaneo
      //console.log('Resultado del escaneo:', result);
  
      // Verifica las propiedades disponibles
      //if (result && result.ScanResult) { // Cambia 'value' por la propiedad correcta
      ///  this.authService.presentToast('Código escaneado: ' + result.ScanResult);
        // Aquí puedes agregar la lógica para navegar a un enlace específico si lo deseas
    //  } else {
   //     this.authService.presentToast('No se encontró contenido en el código escaneado.');
     // }
   // } catch (error) {
   //   this.authService.presentToast('Error al escanear:');
     // console.log('Error al abrir scanner', error);
   // }
 // }
  
        
  
  

}
