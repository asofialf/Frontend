export class Driver {
  id: number;
  first_name: string;
  last_name: string;
  driver_license_number: string;
  image_url: string;
  contact_information_id: number;
  smart_bands_id: number;

  constructor(
    id: number = 0,
    first_name: string = '',
    last_name: string = '',
    driver_license_number: string = '',
    image_url: string = '',
    contact_information_id: number = 0,
    smart_bands_id: number = 0
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.driver_license_number = driver_license_number;
    this.image_url = image_url;
    this.contact_information_id = contact_information_id;
    this.smart_bands_id = smart_bands_id;
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  static fromJson(json: any): Driver {
    return new Driver(
      json.id,
      json.first_name,
      json.last_name,
      json.driver_license_number,
      json.image_url,
      json.contact_information_id,
      json.smart_bands_id
    );
  }
}
