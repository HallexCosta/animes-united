/* eslint-disable @typescript-eslint/ban-types */
declare const kAdd: unique symbol
declare const kTasks: unique symbol
declare const kToObject: unique symbol
export default class Hooks extends Map {
  static get [Symbol.species](): MapConstructor
  [kAdd](trigger: string, commands: string[]): this
  [kTasks](commands: string[]): string
  [kToObject](): Generator<any, void, unknown>
  add(trigger: string, commands: string[]): this
  tasks(commands: string[]): string
  toObject(): {}
}
