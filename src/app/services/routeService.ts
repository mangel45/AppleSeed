import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class routeService {
  navigate(arg0: string[]) {
    throw new Error("Method not implemented.");
  }

  constructor() { }

  public url: string = environment.apiUrl;
  // public url: string = 'https://localhost:5001/api/';

  public header = new HttpHeaders({ 'Content-Type': 'application/json; charset = utf-8' });

}
