/**
 *
 * @author Reinhardt van Rooyen
 *
 */

import { Selector, t, ClientFunction } from 'testcafe';
import commonFunctions from '../commonFiles/commonFunctions.js';
import stroredVariabled from '../commonFiles/storedVariables.js';
import riseAppPageElements from '../pageElements/riseAppPageElements.js';

const varStore = new stroredVariabled();
const pageElements = new riseAppPageElements();

//initializing a go back function
const goBack = ClientFunction(() => window.history.back());

fixture`Tangent Assesment - Rise APP CRUD`.page`https://staging.riseapp.co.za/`;

test('Testing the login portal', async (t) => {
  var users = [varStore.userGreen, varStore.userPink, varStore.userYellow];

  for (let i = 0; i < users.length; i++) {
    await commonFunctions.waitForElement(pageElements.username);

    await t.typeText(pageElements.username, users[i]);
    await t.typeText(pageElements.password, varStore.genPass);
    await t.click(pageElements.loginBtn);

    await commonFunctions.waitForElement(pageElements.menuBtn);

    await goBack();
  }
});

test('Navigating to Nationalities and creating a Nationality', async (t) => {
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  await t.click(pageElements.configs);

  await t.click(pageElements.nationalities);
  await commonFunctions.waitForElement(pageElements.addNationality);
  await t.click(pageElements.addNationality);

  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.typeText(pageElements.natDesc, varStore.natDummyDesc);

  await t.click(pageElements.saveBtn);

  await commonFunctions.waitForElement(pageElements.confirmMsg);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.natDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.natDummyDesc)).exist;
});

test('Viewing the newly created Nationality', async (t) => {
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  await t.click(pageElements.configs);
  await t.click(pageElements.nationalities);
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);

  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.natDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.natDummyDesc)).exist;

  await t.click(pageElements.searchExpect1.withText(varStore.natDummyName));
  await t.expect(pageElements.natName.withAttribute('value', varStore.natDummyName)).exist;
  await t.expect(pageElements.natDesc.withAttribute('value', varStore.natDummyDesc)).exist;
});

test('Editing the newly created Nationality', async (t) => {
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  await t.click(pageElements.configs);

  await t.click(pageElements.nationalities);

  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.natDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.natDummyDesc)).exist;

  await t.click(pageElements.filterEditBtn);
  await t.expect(pageElements.natName.withAttribute('value', varStore.natDummyName)).exist;
  await t.expect(pageElements.natName.withAttribute('value', varStore.natDummyDesc)).exist;

  await t.click(pageElements.natName);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natName, varStore.updateDummyName);

  await t.click(pageElements.natDesc);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natDesc, varStore.updateDummyDesc);

  await t.click(pageElements.saveBtn);

  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc)).exist;

  await t.click(pageElements.searchExpect1.withText(varStore.updateDummyName));
  await t.expect(pageElements.natName.withAttribute('value', varStore.updateDummyName)).exist;
  await t.expect(pageElements.natName.withAttribute('value', varStore.updateDummyDesc)).exist;

  await t.click(pageElements.deepEditBtn);

  await t.click(pageElements.natName);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natName, varStore.updateDummyName2);

  await t.click(pageElements.natDesc);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natDesc, varStore.updateDummyDesc2);

  await t.click(pageElements.saveBtn);

  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);

  await t.typeText(pageElements.natName, varStore.updateDummyName2);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName2)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc2)).exist;

  await t.wait(5000);
});

test('Deleting the edited Nationality', async (t) => {
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  await t.click(pageElements.configs);

  await t.click(pageElements.nationalities);

  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName2);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName2)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc2)).exist;

  await t.click(pageElements.deleteBtn);

  await t.click(pageElements.ConfirmDelete);

  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName2);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName2).exists).notOk();
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc2).exists).notOk();
});
