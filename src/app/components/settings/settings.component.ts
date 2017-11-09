import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings;

  constructor(
    public settingsService: SettingsService,
    public flashMessagesService: FlashMessagesService,
    public router: Router) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.updateSettings(this.settings);
    this.flashMessagesService.show('Sucessfully updated!', {cssClass:'alert-success', timeout: 3000});
    this.router.navigate(['/settings']);
  }
}