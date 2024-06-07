import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bus } from '../../models/bus';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-modal-bus',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatButton
  ],
  templateUrl: './modal-bus.component.html',
  styleUrl: './modal-bus.component.scss'
})
export class ModalBusComponent implements OnInit {
  state: any[] = [
    {
      value: 'OPERATIVO',
      viewValue: 'Operativo'
    },
    {
      value: 'FUERA_DE_SERVICIO',
      viewValue: 'Fuera de servicio'
    }
  ];
  
  bus: Bus;
  isEdit: boolean;
  busForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<ModalBusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.bus = data.bus;
    this.isEdit = data.isEdit;
    this.busForm = this.fb.group({
      licensePlate: ['', Validators.required],
      year: ['', Validators.required],
      totalCapacity: ['', Validators.required],
      state: ['OPERATIVO', Validators.required]
    })

    if (this.isEdit) {
      this.busForm.patchValue(data.bus);
    }
  }

  ngOnInit(): void {}
   
  busSubmit() {
    throw new Error('Method not implemented.');
  }
}
