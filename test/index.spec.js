import {add} from '../src/index';
import chai from 'chai';
import assert from 'assert'

let expect = chai.expect;
console.log(add)
describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
    // assert.equal(2, add(1, 1));

    expect(1).to.equal(1);
  });
}); 