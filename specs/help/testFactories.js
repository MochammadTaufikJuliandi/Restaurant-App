/* eslint-disable import/prefer-default-export */
/* eslint-disable quotes */
import SaveButtonInitiator from "../../src/scripts/utils/save-button-initiator";

const createSavedButton = async (restaurant) => {
  await SaveButtonInitiator.init({
    saveButtonContainer: document.querySelector('#saveButtonContainer'),
    restaurant,
  });
};

export { createSavedButton };
