import Swal from 'sweetalert2';
import ApiRepository from '../../data/api-repository';
import AddReview from '../../utils/add-review';
import UrlParser from '../../routes/url-parser';
import '../../component/loading-indicator';
import '../../component/restaurant-detail';
import SaveButtonInitiator from '../../utils/save-button-initiator';

class Detail {
  static async render() {
    return `<loading-indicator></loading-indicator>
            <restaurant-detail id="maincontent" class="maincontent" tabindex="0"></restaurant-detail>
            <div id="saveButtonContainer"></div>
            `;
  }

  static async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const loadingElement = document.querySelector('loading-indicator');
    const restaurantElement = document.querySelector('restaurant-detail');

    try {
      const response = await ApiRepository.getRestaurantDetail(url.id);
      restaurantElement.restaurantItem = response;

      await SaveButtonInitiator.init({
        saveButtonContainer: document.querySelector('#saveButtonContainer'),
        restaurant: response.restaurant,
      });
    } catch (message) {
      restaurantElement.renderError(message);
    } finally {
      loadingElement.style.display = 'none';
    }

    const btnSubmit = document.querySelector('#submit-review');
    const nameInput = document.querySelector('#inputName');
    const reviewInput = document.querySelector('#inputReview');

    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      if (nameInput.value === '' || reviewInput.value === '') {
        Swal.fire({
          title: 'Something went wrong!',
          text: "No input can't be empty!",
          icon: 'error',
        });

        nameInput.value = '';
        reviewInput.value = '';
      } else {
        AddReview(url, nameInput.value, reviewInput.value);
        nameInput.value = '';
        reviewInput.value = '';
      }
    });
  }
}

export default Detail;
