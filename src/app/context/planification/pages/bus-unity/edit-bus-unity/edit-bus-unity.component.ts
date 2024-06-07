import { Component } from '@angular/core';
import {Location, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-bus-unity',
  standalone: true,
  imports: [],
  templateUrl: './edit-bus-unity.component.html',
  styleUrl: './edit-bus-unity.component.scss'
})
export class EditBusUnityComponent {
  constructor(private location:Location){}
  goBack(){
    this.location.back();
  }
}
