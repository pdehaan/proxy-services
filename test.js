const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const {getEmbedly, getMetadata, getRecommendations} = require('./index');

chai.should();
chai.use(chaiAsPromised);

describe('getRecommendations()', () => {
  it('should return recommendations', () => {
    return getRecommendations()
      .should.eventually.be.an('array');
  });
});

describe('getMetadata()', () => {
  it('should return URLs parsed by metadata proxy', () => {
    return getRecommendations()
      .then(getMetadata)
      .should.eventually.be.an('object');
  });
});

describe('getEmbedly()', () => {
  it('should return URLs parsed by embedly proxy', () => {
    return getRecommendations()
      .then(getEmbedly)
      .should.eventually.be.an('object');
  });
});
