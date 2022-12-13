/* eslint-disable eol-last */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Saving Restaurant');

Before((I) => {
  I.amOnPage('/');
});

Scenario('Showing empty saved restaurant', (I) => {
  I.amOnPage('/#/favorite');
  I.see('There are no favorite restaurants yet', '#emptyFavorite');
});

Scenario('Saving a restaurant', async (I) => {
  I.amOnPage('/');

  I.seeElement('#maincontent');
  I.seeElement('restaurant-list');
  I.seeElement('restaurant-item a');

  const firstRestaurant = locate('restaurant-item a').first();
  const firstRestaurantName = await I.grabTextFrom(locate('restaurant-item .title').first());

  I.click(firstRestaurant);

  I.seeElement('#saveButton');
  I.click('#saveButton');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-list');
  I.seeElement('restaurant-item');

  const savedRestaurantName = await I.grabTextFrom('restaurant-item .title');

  assert.strictEqual(firstRestaurantName, savedRestaurantName);
});

Scenario('Removing a restaurant', async (I) => {
  I.amOnPage('/');

  I.seeElement('#maincontent');
  I.seeElement('restaurant-list');
  I.seeElement('restaurant-item a');

  const firstRestaurant = locate('restaurant-item a').first();
  const firstRestaurantName = await I.grabTextFrom(locate('restaurant-item .title').first());

  I.click(firstRestaurant);

  I.seeElement('#saveButton');
  I.click('#saveButton');

  I.amOnPage('/#/favorite');
  I.seeElement('restaurant-item');

  const savedRestaurantName = await I.grabTextFrom('restaurant-item .title');
  assert.strictEqual(firstRestaurantName, savedRestaurantName);

  const savedRestaurant = locate('restaurant-item a').first();
  const firstSavedRestaurantName = await I.grabTextFrom(locate('restaurant-item .title').first());

  I.click(savedRestaurant);

  I.seeElement('#deleteButton');
  I.click('#deleteButton');

  const removedRestaurantName = await I.grabTextFrom('restaurant-detail h1');
  assert.strictEqual(firstSavedRestaurantName, removedRestaurantName);

  I.amOnPage('/#/favorite');
  I.see('There are no favorite restaurants yet', '#emptyFavorite');
});

Scenario('Add Review', async (I) => {
  I.amOnPage('/');

  I.seeElement('#maincontent');
  I.seeElement('restaurant-list');
  I.seeElement('restaurant-item a');

  const firstRestaurant = locate('restaurant-item a').first();

  I.click(firstRestaurant);

  I.seeElement('#inputName');
  I.click('#inputName');
  I.fillField('#inputName', 'Test Name');

  I.seeElement('#inputReview');
  I.click('#inputReview');
  I.fillField('#inputReview', 'Test Review');

  I.seeElement('#submit-review');
  I.click('#submit-review');

  const addReview = locate('.review').last();
  I.seeElement(addReview);
});