import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    try {
      const fighterDetails = await callApi(`details/fighter/${id}.json`);
      return fighterDetails;
    } catch (error) {
      console.error(error);
    }
  }
}

export const fighterService = new FighterService();
