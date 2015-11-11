log = console.log


# module.exports


# 默认导出的是空对象{}
#emptyModule = require './emptyExports'
#log emptyModule




# module.exports才是真正导出的内容 exports只是它的引用
# exports = module.exports
#log module.exports is exports

#exports.name = 'module index'
#log module.exports

#module.exports.name = 'module index'
#log exports

#exports = name : 'module index'
#log module.exports

#module.exports = name : 'module index'
#log exports


#log Object.keys global

#log require
#log require.main is module

# 循环引用
#a = require './a'
#b = require './b'
#
#log 'in main a.done = %s, b.done = %s', a.done, b.done


# require  .js > .json > .node
#log require './module1'


# 查找node_modules的顺序, 当前文件夹 > ... > NODE_PATH
#log require 'async'
#log require 'nedb'

# 文件夹作为模块
#module.exports = 'the folder module'

# cache
#require './cache1'
#require './cache2'
