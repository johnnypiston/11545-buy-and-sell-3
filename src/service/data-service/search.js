'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  searchOffers() {
    return [...this._offers];
  }
}

module.exports = SearchService;
