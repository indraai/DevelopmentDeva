// Copyright (c):year: :copyright:
// :name: test file

const {expect} = require('chai')
const DevelopmentDeva = require('./index.js');

describe(DevelopmentDeva.me.name, () => {
  beforeEach(() => {
    return DevelopmentDeva.init()
  });
  it('Check the DEVA Object', () => {
    expect(DevelopmentDeva).to.be.an('object');
    expect(DevelopmentDeva).to.have.property('agent');
    expect(DevelopmentDeva).to.have.property('vars');
    expect(DevelopmentDeva).to.have.property('listeners');
    expect(DevelopmentDeva).to.have.property('methods');
    expect(DevelopmentDeva).to.have.property('modules');
  });
})
