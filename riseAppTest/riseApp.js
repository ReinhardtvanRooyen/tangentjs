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
  //creating an array of the users for testing all logins
  var users = [varStore.userGreen, varStore.userPink, varStore.userYellow];

  //looping through each user logging
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
  //log into rise app
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  //waiting for the menu (burger button) to be visible before continuing
  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  //navigate to the configs
  await t.click(pageElements.configs);
  //navigate to the nationalities
  await t.click(pageElements.nationalities);
  await commonFunctions.waitForElement(pageElements.addNationality);
  //click on the add nationality button
  await t.click(pageElements.addNationality);

  //wait for the input name to be visible and then entering details
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.typeText(pageElements.natDesc, varStore.natDummyDesc);

  //click the save button
  await t.click(pageElements.saveBtn);

  //wait for the confirmation message to be visible
  await commonFunctions.waitForElement(pageElements.confirmMsg);
  //click the filter button and entering the name of the nationality that was saved
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  //expecting that the return result was the details entered when saving the record
  await t.expect(pageElements.searchExpect1.withText(varStore.natDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.natDummyDesc)).exist;
});

test('Viewing the newly created Nationality', async (t) => {
  //log into rise app
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  //waiting for the menu (burger button) to be visible before continuing
  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  //navigate to the configs
  await t.click(pageElements.configs);
  //navigate to the nationalities
  await t.click(pageElements.nationalities);
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);

  //entering the text of the saved record so that it can be viewed
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  //expecting that the return result was the details entered when saving the record
  await t.expect(pageElements.searchExpect1.withText(varStore.natDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.natDummyDesc)).exist;

  //clicking on the record to view it and expecting the details entered when the record was saved
  await t.click(pageElements.searchExpect1.withText(varStore.natDummyName));
  await t.expect(pageElements.natName.withAttribute('value', varStore.natDummyName)).exist;
  await t.expect(pageElements.natDesc.withAttribute('value', varStore.natDummyDesc)).exist;
});

test('Editing the newly created Nationality', async (t) => {
  //log into rise app
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  //waiting for the menu (burger button) to be visible before continuing
  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  //navigate to the configs
  await t.click(pageElements.configs);
  //navigate to the nationalities
  await t.click(pageElements.nationalities);

  //filtering for the record that needs to be edited
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.natDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  //expecting the details entered when the record was saved
  await t.expect(pageElements.searchExpect1.withText(varStore.natDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.natDummyDesc)).exist;

  //click on the edit button and expecting the value attrubute to mach the saved record data
  await t.click(pageElements.filterEditBtn);
  await t.expect(pageElements.natName.withAttribute('value', varStore.natDummyName)).exist;
  await t.expect(pageElements.natName.withAttribute('value', varStore.natDummyDesc)).exist;

  //clear the name and entering a new name
  await t.click(pageElements.natName);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natName, varStore.updateDummyName);

  //clear the description and entering a new description
  await t.click(pageElements.natDesc);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natDesc, varStore.updateDummyDesc);
  //click save
  await t.click(pageElements.saveBtn);

  //filtering for the newly updated record and expecting the data to match the update
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc)).exist;

  //click on the record to view and validate the data has updated
  await t.click(pageElements.searchExpect1.withText(varStore.updateDummyName));
  await t.expect(pageElements.natName.withAttribute('value', varStore.updateDummyName)).exist;
  await t.expect(pageElements.natName.withAttribute('value', varStore.updateDummyDesc)).exist;

  //click the edit button
  await t.click(pageElements.deepEditBtn);

  //clear the name and entering a new name
  await t.click(pageElements.natName);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natName, varStore.updateDummyName2);

  //clearning the description and entering a new description
  await t.click(pageElements.natDesc);
  await t.pressKey('ctrl+a delete');
  await t.typeText(pageElements.natDesc, varStore.updateDummyDesc2);
  //click save
  await t.click(pageElements.saveBtn);

  //filtering for the newly updated record and validating that the record updated
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName2);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName2)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc2)).exist;
});

test('Deleting the edited Nationality', async (t) => {
  //log into rise app
  await commonFunctions.login(varStore.userGreen, varStore.genPass);

  //waiting for the menu (burger button) to be visible before continuing
  await commonFunctions.waitForElement(pageElements.menuBtn);
  await t.click(pageElements.menuBtn);

  //navigate to the configs
  await t.click(pageElements.configs);
  //navigate to the nationalities
  await t.click(pageElements.nationalities);

  //filtering for the last updated record
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName2);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  //expect that the filtered and returned result matches
  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName2)).exist;
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc2)).exist;

  //click confirm and detele the record
  await t.click(pageElements.deleteBtn);
  await t.click(pageElements.ConfirmDelete);

  //filter for the record to validate the record was deleted
  await commonFunctions.waitForElement(pageElements.filterBtn);
  await t.click(pageElements.filterBtn);
  await commonFunctions.waitForElement(pageElements.natName);
  await t.typeText(pageElements.natName, varStore.updateDummyName2);
  await t.click(pageElements.searchBtn);
  await commonFunctions.waitForElement(pageElements.searchRecords);

  //expect the record to not exist
  await t.expect(pageElements.searchExpect1.withText(varStore.updateDummyName2).exists).notOk();
  await t.expect(pageElements.searchExpect2.withText(varStore.updateDummyDesc2).exists).notOk();
});
