import Swal from 'sweetalert2';
import ApiRepository from '../../data/api-repository';
import '../../component/loading-indicator';
import '../../component/restaurant-list';

class Home {
  static async render() {
    return `
      <section class="jumbotron">
        <picture>
          <source media="(min-width:601px)" srcset="./images/heros/hero-image_3-large.jpg">
          <source media="(max-width:600px)" srcset="./images/heros/hero-image_3-small.jpg">
      
          <img src="./images/heros/hero-image_3-large" alt="Heroes Image">
        </picture>

          <h1 class="jumbotron-title">Welcome To Food Pedia</h1>
      </section>
      
      <article id="maincontent" tabindex="0">
          <h2>Restaurant</h2>
          <loading-indicator></loading-indicator>
          <restaurant-list class="wrapper"></restaurant-list>
      </article>
    `;
  }

  static async afterRender() {
    // const jumbotronElement = document.querySelector('.jumbotron');
    const loadingElement = document.querySelector('loading-indicator');
    const restaurantListElement = document.querySelector('restaurant-list');

    // jumbotronElement.style.backgroundImage = "url('./images/heros/hero-image_3.jpg')";

    try {
      const response = await ApiRepository.getRestaurantList();
      restaurantListElement.restaurants = response;
    } catch (message) {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
      });
    } finally {
      loadingElement.style.display = 'none';
    }
  }
}

export default Home;
