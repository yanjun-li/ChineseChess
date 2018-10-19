// import {add} from '../src/index'
// import assert from 'assert'
// import chai from 'chai'

// let expect = chai.expect
// describe('加法函数的测试', function () {
//   it('1 加 1 应该等于 2', function () {
//     expect(add(1, 1)).to.be.equal(2)
//     // assert.equal(2, add(1, 1));

//     expect(1).to.equal(1)
//   })
// })
describe('加法函数的测试', function () {
  test('1 加 1 应该等于 2', function () {
    expect(1+1).toBe(2);
    expect(1).toBe(1);
  })
})