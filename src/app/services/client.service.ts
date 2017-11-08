import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Client } from '../models/Client';

@Injectable()
export class ClientService {
  clientsRef: AngularFireList<any>;
  clients: Observable<any[]>; // return to the component.
  client: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.clientsRef = this.db.list('clients');

    // If I use valueChanges() instead of using snapshotChanges() I won't be able to fetch key.
    // Details: https://github.com/angular/angularfire2/blob/master/docs/rtdb/lists.md
    this.clients = this.clientsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
   }

   getClients() { return this.clients; }

}
