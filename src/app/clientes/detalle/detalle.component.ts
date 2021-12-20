import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  cliente!: Cliente;
  fotoSelecionada!:File;
  progreso: number = 0;

  constructor(private clienteService:ClienteService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id')!;

      if(id){
        this.clienteService.getCliente(id).subscribe(cliente =>{
          this.cliente = cliente;
        })
      }


    });
  }


  seleccionarFoto(event:any){
    this.fotoSelecionada = event.target.files[0];
    console.log(this.fotoSelecionada);
  }

  subirFoto() {

    if (!this.fotoSelecionada) {
      swal('Error Upload: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSelecionada, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total!) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;
            swal('La foto se ha subido completamente!', response.mensaje, 'success');
          }
        });
    }
  }

}
