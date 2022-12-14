/* eslint-disable import/extensions */
/* eslint-disable indent */
import CONFIG from '../data/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit.js';

class RestaurantItem extends HTMLElement {
  set restaurantItem(restaurant) {
    this.restaurant = restaurant;
    this.render();
  }

  render() {
    this.innerHTML = `
      <a class="resto" href="#/detail/${this.restaurant.id}">
          <section class="card">
            <div class="rating">
              ${
                this.restaurant.rating >= 2.5
                  ? '<i class="fa-solid fa-star"></i>'
                  : '<i class="fa-solid fa-star-half"></i>'
              } ${this.restaurant.rating}
            </div>
            <img class="lazyload" data-src="${CONFIG.BASE_IMAGE_URL}${this.restaurant.pictureId}" alt="${this.restaurant.name} Image">
            <p class="city">${this.restaurant.city}</p>
            <h3 class="title">${this.restaurant.name}</h3>
            <p class="text-overflow">${this.restaurant.description}</p>
        </section>
      </a>
    `;
  }
}

customElements.define('restaurant-item', RestaurantItem);
