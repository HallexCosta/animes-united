/* eslint-disable prettier/prettier */
const kAdd = Symbol('kAdd')
const kIteratorItems = Symbol('kIteratorItems')

module.exports = class StagedCommands extends Array {
  static get [Symbol.species]() {
    return Array
  }

  /*
    @param  {array} commands
    @return {this}
  */
  [kAdd](commands) {
    super.push(...commands)
    return this
  }

  /*
    @param  {array} commands
    @return {this}
  */
  add(...commands) {
    return this[kAdd](commands)
  }

  /*
    @param  {array} items
    @return {this}
  */
  * [kIteratorItems](items) {
    for (const item of items) {
      yield item
    }
  }

  /*
    @return {generator}
  */
  * [Symbol.iterator]() {
    const items = super.values()
    for (const item of this[kIteratorItems](items)) {
      yield item.toString()
    }
  }
}
