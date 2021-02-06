/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const kAdd = Symbol('kAdd')
const kTasks = Symbol('kTasks')
const kToObject = Symbol('kToObject')

module.exports = class Hooks extends Map {
  static get [Symbol.species]() {
    return Map
  }

  /*
    @param  {string} trigger
    @param  {array}  commands
    @return {this}
  */
  [kAdd](trigger, commands) {
    super.set(trigger, this.tasks(commands))
    return this
  }

  /*
    @param  {array} commands
    @return {array}
  */
  [kTasks](commands) {
    return commands.join(' && ')
  }

  /*
    @return {generator} Description.
  */
  * [kToObject]() {
    const hooks = {}
    for (const [trigger, command] of [...super.entries()]) {
      hooks[trigger] = command
    }
    yield hooks
  }

  /*
    @param  {string} trigger
    @param  {array}  commands
    @return {this}
  */
  add(trigger, commands) {
    return this[kAdd](trigger, commands)
  }

  /*
    @param  {array} commands
    @return {array}
  */
  tasks(commands) { 
    return this[kTasks](commands)
  }

  /*
    @return {generator}
  */
  toObject() {
    return this[kToObject]().next().value
  }
}
