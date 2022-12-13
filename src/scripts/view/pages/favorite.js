/* eslint-disable space-before-blocks */
/* eslint-disable eqeqeq */
import Swal from 'sweetalert2';
import LocalData from '../../data/local-data';
import '../../component/restaurant-list';

class Favorite {
  static async render() {
    return `<h1>Favorite Restaurant Is Here!</h1>
    <h3 id="emptyFavorite">There are no favorite restaurants yet</h3>
        <restaurant-list class="wrapper" id="maincontent" tabindex="0"></restaurant-list>`;
  }

  static async afterRender() {
    const restaurantListElement = document.querySelector('restaurant-list');
    const favoriteData = await LocalData.getAllSaved();
    const emptyFavorite = document.querySelector('#emptyFavorite');

    if (favoriteData.length == 0) {
      Swal.fire({
        title: 'No Data?',
        text: 'There are no favorite restaurants yet!',
        icon: 'warning',
      });
    }
    if (favoriteData.length > 0){
      emptyFavorite.style.display = 'none';
    }

    restaurantListElement.restaurants = favoriteData;
  }
}

export default Favorite;
