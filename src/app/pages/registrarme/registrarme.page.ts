import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from  '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from 'src/app/model/usuario';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderAnonComponent } from 'src/app/components/header-anon/header-anon.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, FooterComponent,  HeaderAnonComponent, RouterModule]
})

export class RegistrarmePage implements OnInit {
  UsuNuevo: Usuario = new Usuario(); 

  constructor(private navCtrl: NavController, private dataBaseService: DataBaseService,private router: Router) {}

  ngOnInit(): void {
    
  }

  async Registro() {
    if (await this.isValidForm) {

      const ExisteUsuario = await this.dataBaseService.UsuarioExistente(this.UsuNuevo.correo);
     
      if(!ExisteUsuario) {
        this.dataBaseService.guardarUsuario(this.UsuNuevo);
        this.navCtrl.navigateRoot(['/ingreso']);

      } else {
        console.log('No Se creo el usuario o algo paso')
      }
     
      this.dataBaseService.guardarUsuario(this.UsuNuevo);

      
    }
  }

  async isValidForm(): Promise<boolean> {
   
    return (
      !!this.UsuNuevo.correo &&
      !!this.UsuNuevo.password &&
      !!this.UsuNuevo.nombre &&
      !!this.UsuNuevo.apellido &&
      !!this.UsuNuevo.preguntaSecreta &&
      !!this.UsuNuevo.respuestaSecreta
    );
  }

  public inicio(){
    this.router.navigate(['ingreso']);
  }
}