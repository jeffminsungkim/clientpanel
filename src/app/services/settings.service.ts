import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: false,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() { }

  getSettings() {
    return this.settings;
  }
}