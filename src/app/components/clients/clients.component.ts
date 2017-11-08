import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: any[];

  constructor(private clientService: ClientService) {

   }

  ngOnInit() {
    // fetch the clients from our service.
    this.clientService.getClients().subscribe(clients => {
      console.log(clients);
    });
  }

}
