import Point from '../src/Point'
import { equal } from 'assert';

let point = new Point(1, 1)

describe('Point类的测试', function () {
  test('创建', () => {
    expect(point).toEqual({x:1,y:1})
  })

  test('move test', () => {
    let point1 = new Point(1, 1)
    point1.move(1,1)
    expect(point1).toEqual({x:2,y:2})
  })

  test('toSting() is (1,1)',() => {
    expect(point.toString()).toBe('(1,1)')
  })

  test('moveTo方法测试', function () {
    let point2 = new Point(1, 1)
    point2.moveTo(2,3)
    expect(point2).toEqual({x:2,y:3})
  })

  test('distanst',() => {
    let p1 = new Point(1,1)
    let p2 = new Point(4,5)
    expect(p1.distanceTo(p2)).toBe(5)
  })

  test('equal', () => {
    let p1 = new Point(1,1)
    let p2 = new Point(1,1)
    let p3 = new Point(2,1)
    expect(p1.equals(p2)).toBe(true)
    expect(p1.equals(p3)).not.toBe(true)
  })
})
