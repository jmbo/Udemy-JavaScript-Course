import View from './View';

import icons from 'url:../../img/icons.svg';
// import { Fraction } from 'fractional';
import fracty from 'fracty';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  _errorMessage = '';
  _successMessage = '';

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
