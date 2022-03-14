/**
 *
 * @author Reinhardt van Rooyen
 *
 */

import { Selector } from 'testcafe';

export default class Page {
  constructor() {
    this.username = Selector('#id_username');
    this.password = Selector('#id-password');
    this.loginBtn = Selector('body > div.app-content.content > div > div.content-body > section > * div.card-content > div > form > button');
    this.menuBtn = Selector('#navbar-mobile > ul.nav.navbar-nav.mr-auto.float-left > li > a > i');
    this.totalNatCount = '#narrow-results > a  * h3';
    this.configs = Selector('span').withText('Configs');
    this.nationalities = Selector('a').withText('Nationalities');
    this.addNationality = Selector('span').withText('Add Nationality');
    this.natName = Selector('#id_name');
    this.natDesc = Selector('#id_description');
    this.saveBtn = Selector('input[name="save"]');
    this.confirmMsg = Selector('div').withText('Nationality successfully Created');
    this.filterBtn = Selector('#table-filter-helper-search-link');
    this.searchBtn = Selector('#filter_button');
    this.searchExpect1 = Selector('a');
    this.searchExpect2 = Selector('td');
    this.searchRecords = Selector('div > div:nth-child(4) > div.card-header > h4');
    this.noticeMsg = Selector('div');
    this.filterEditBtn = Selector('div.card-body > div > div > table > tbody > tr > td:nth-child(3) > a > i');
    this.deepEditBtn = Selector('a.btn.btn-primary.btn');
    this.deleteBtn = Selector('tr > td:nth-child(4) > a > i');
    this.paragraphMsg = Selector('p:nth-child(2)');
    this.ConfirmDelete = Selector('div.content-body * form > button');
  }
}
