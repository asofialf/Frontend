import { Component } from '@angular/core';
import {Location, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-add-bus-unity',
  standalone: true,
  imports: [
    NgForOf,
    NgIf],
  templateUrl: './add-bus-unity.component.html',
  styleUrl: './add-bus-unity.component.scss'
})
export class AddBusUnityComponent {
  constructor(private location:Location){}
  onSubmit() {
    console.log('Hola');
  }
  goBack(){
    this.location.back();
  }
  shouldShowError() {
  
  }
}
