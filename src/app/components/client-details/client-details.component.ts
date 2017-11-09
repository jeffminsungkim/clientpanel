import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  clientFullName: string;
  client: Client;
  hasBalance: boolean;
  showBalanceUpdateInput: boolean;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
      this.clientFullName = this.client.firstName +" "+ this.client.lastName;
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance updated!', {cssClass:'alert-success', timeout: 2000});
    this.showBalanceUpdateInput = false;
    if (this.client.balance == 0) 
      this.hasBalance = false;
    else 
      this.hasBalance = true;
  }

  onDeleteClick() {
    if (confirm("Are you sure you want to delete the account?")) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show(this.clientFullName +" "+ 'successfully removed.', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }
}