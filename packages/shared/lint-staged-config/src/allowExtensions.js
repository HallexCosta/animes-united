/* eslint-disable prettier/prettier */
const kAdd = Symbol('kAdd')
const kAll = Symbol('kAll')
const kAllowExtensions = Symbol('kAllowExtensions')
const kAllowExtensionsIterator = Symbol('kAllowExtensionsIterator')

module.exports = class AllowExtensions {
  constructor() {
    this[kAllowExtensions] = []
  }

  /*
    @param  {string} language
    @param  {string} extension
    @return {this}
  */
  [kAdd](allowExtension) {
    this[kAllowExtensions].push(allowExtension)
    return this
  }

  /*
    @param  {string} language
    @param  {string} extension
    @return {this}
  */
  add(language, extension) {
    return this[kAdd]({language, extension})
  }

  /*
    @param  {array} items
    @return {this}
  */
  * [kAllowExtensionsIterator](allowExtensions) {
    for (const { language, extension } of allowExtensions) {
      yield [language, extension]
    }
  }

  /*
    @return {object}
  */
  [kAll]() {
    const extensions = {}
    for (const [language, extension] of this[kAllowExtensionsIterator](
      this[kAllowExtensions]
    )) {
      extensions[language] = extension
    }
    return extensions
  }

  /*
    @return {object}
  */
  all() {
    return this[kAll]()
  }
}
