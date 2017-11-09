import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';

@Injectable()
export class SettingsService {
  settings: Settings = {
    allowRegistration: true,
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: true
  }

  constructor() {
    // Used VanillaJS localStorage method in order to store info in browser. Nothing to do with Angular.
    // Details: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    if (localStorage.getItem('settings') != null) {
      // When we're getting it, parsing it to an object from a string
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
  }

  getSettings() {
    return this.settings;
  }

  updateSettings(settings: Settings){
    // When we insert it to the localStorage, we're taking an object and turning it into a string before we put it in.
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}