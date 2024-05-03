import {Injectable} from '@angular/core';
import {UserProfileCardInformation} from "../../domain/models/userProfileCardInformation";
@Injectable({
  providedIn: 'root'
})
export class AccountService{

  private currentUser:UserProfileCardInformation= {
    name: "Axel Fiestas",
    email: "axelfiestas@gmail.com",
    imageUrl: "assets/images/planification/bus_flote/bus_manager_profile_photo.png"
  };

  getCurrentUser() {
    return this.currentUser;
  }

  // Método para actualizar el usuario si es necesario
  setCurrentUser(user: any) {
    this.currentUser = user;
  }
}
