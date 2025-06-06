import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ElementDialog } from './element-dialog/element-dialog';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
// import { HeroiService } from './services/heroi.service';
// import { SuperpoderService } from './services/superpoder.service';
// import { Heroi } from './services/heroi.model';
// import { Superpoder } from './services/superpoder.model';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  formCrud: FormGroup;
  pessoas: Pessoa[] = [];
  mostrarTabela: boolean | undefined;

  @ViewChild('table') table: any;

  displayedColumns: string[] = [
    'id',
    'nome',
    'heroi',
    'poderes',
    'dataNascimento',
    'altura',
    'peso',
    'actions',
  ];

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.formCrud = fb.group({
      nome: ['', Validators.required],
      heroi: [''],
      dataNascimento: [new Date(), Validators.required],
      poderes: [''],
      altura: [''],
      peso: [''],
    });

    this.formCrud
      .get('dataNascimento')
      ?.setValidators(this.dataNascimentoValidator);
  }



  dataNascimentoValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const data = new Date(control.value);
    return data > new Date() ? { dataFutura: true } : null;
  }

  onIncluirPessoa() {
    if (this.formCrud.invalid) {
      console.log('Formulário inválido');
      return;
    }

    const heroi = this.formCrud.get('heroi')?.value;
    const heroiExiste = this.pessoas.some(p => p.heroi === heroi);
    if (heroiExiste) {
      this.formCrud.get('heroi')?.setErrors({ duplicate: true });
      return;
    }

    const pessoa: Pessoa = {
      id: this.pessoas.length + 1,
      nome: this.formCrud.get('nome')?.value,
      heroi: this.formCrud.get('heroi')?.value,
      dataNascimento: new Date(this.formCrud.get('dataNascimento')?.value).toLocaleDateString('pt-BR'),
      poderes: this.formCrud.get('poderes')?.value,
      altura: this.formCrud.get('altura')?.value,
      peso: this.formCrud.get('peso')?.value,
    };

    this.pessoas.push(pessoa);
    this.table.renderRows();
    this.formCrud.reset();
  }

  editarPessoa(pessoa: Pessoa): void {
    const dialogRef = this.dialog.open(ElementDialog, {
      width: '250px',
      data: { pessoa },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  excluirPessoa(id: number) {
    const index = this.pessoas.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pessoas.splice(index, 1);
      this.table.renderRows();
    }
  }

  limparCampos() {
    this.formCrud.reset();
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.pessoas = this.pessoas.filter(p =>
      p.nome.toLowerCase().includes(value)
    );
  }
}

export interface Pessoa {
  id: number;
  nome: string;
  heroi: string;
  dataNascimento: string;
  poderes: string;
  altura: number;
  peso: number;
}
