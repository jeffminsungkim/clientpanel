import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  c: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  client: Object = {
    value: {},
    valid: false
  }

  disableBalanceOnAdd: boolean = true;

  constructor(private flashMessagesService: FlashMessagesService, private router: Router, private clientService: ClientService) { }

  ngOnInit() {
  }

  onSubmit(client) {
    if (this.disableBalanceOnAdd) {
      client.value.balance = 0;
    }
    if (!client.valid) {
      this.flashMessagesService.show('Please fill in all fields', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['add-client']);
    } else {
      this.clientService.newClient(client.value);
      this.flashMessagesService.show('New client added', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }
}
