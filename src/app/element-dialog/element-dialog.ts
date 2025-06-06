import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pessoa } from '../app';

@Component({
  selector: 'app-element-dialog',
  imports: [],
  templateUrl: './element-dialog.html',
  styleUrl: './element-dialog.scss'
})
export class ElementDialog {
constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pessoa: Pessoa }
  ) {}
}
