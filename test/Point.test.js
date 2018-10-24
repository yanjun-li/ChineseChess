import Point from '../src/Point'

let point = new Point(1, 1)

describe('Point类的测试', function () {
  test('创建', () => {
    expect(point).toEqual({x:1,y:1})
  })
  test('toSting() is (1,1)',() => {
    expect(point.toString()).toBe('(1,1)')
  })
  test('move方法测试', function () {
    point.moveTo(2,3)
    expect(point).toEqual({x:2,y:3})
  })
})
