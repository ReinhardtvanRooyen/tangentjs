/**
 *
 * @author Reinhardt van Rooyen
 *
 */

import { Selector, t, ClientFunction } from 'testcafe';
import riseAppPageElements from '../pageElements/riseAppPageElements.js';

const pageElements = new riseAppPageElements();

exports.login = async function (username, password) {
  await this.waitForElement(pageElements.username);
  await t.typeText(pageElements.username, username);
  await t.typeText(pageElements.password, password);
  await t.click(pageElements.loginBtn);
};

exports.waitForElement = async function (pageElement) {
  var timeoutCount = 1;
  do {
    await t.wait(500);
    timeoutCount++;
  } while (!(await pageElement.exists) && timeoutCount < 120);

  if (timeoutCount == 120) {
    throw new Error(`The page element took longer than a minute to become visibile`);
  }
};
