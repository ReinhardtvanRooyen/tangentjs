/**
 *
 * @author Reinhardt van Rooyen
 *
 */

import { Selector } from 'testcafe';

export default class Page {
  constructor() {
    this.userPink = 'pinkshrub@riseapp.co.za';
    this.userYellow = 'yellowgrass@riseapp.co.za';
    this.userGreen = 'greentree@riseapp.co.za';
    this.genPass = 'adminadmin123';
    this.natDummyName = 'Reinhardtians';
    this.natDummyDesc = 'Legend has it that the people born here can hold their breath for more than 30 seconds!';
    this.updateDummyName = 'Van Rooyens';
    this.updateDummyDesc = 'Now these country people can do at least 33 seconds of breath holding!';
    this.updateDummyName2 = 'Sheeeshians';
    this.updateDummyDesc2 = 'DO NOT, I REPEAT, DO NOT VISIT THIS PLACE!!!';
    this.deleteMsg = 'Are you sure you want to delete this nationality?';
  }
}
