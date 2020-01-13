源码分析s
## Compiler webpack/compiler.js/line 107

Compiler::: environment ::: SyncHook :::
Compiler::: afterEnvironment ::: SyncHook :::
Compiler::: entryOption ::: SyncBailHook ::: context,entry
Compiler::: afterPlugins ::: SyncHook ::: compiler
Compiler::: afterResolvers ::: SyncHook ::: compiler
Compiler::: beforeRun ::: AsyncSeriesHook ::: compiler
Compiler::: run ::: AsyncSeriesHook ::: compiler
Compiler::: normalModuleFactory ::: SyncHook ::: normalModuleFactory
Compiler::: contextModuleFactory ::: SyncHook ::: contextModulefactory
Compiler::: beforeCompile ::: AsyncSeriesHook ::: params
Compiler::: compile ::: SyncHook ::: params
Compiler::: thisCompilation ::: SyncHook ::: compilation,params
Compiler::: compilation ::: SyncHook ::: compilation,params
Compiler::: make ::: AsyncParallelHook ::: compilation
Compiler::: afterCompile ::: AsyncSeriesHook ::: compilation
Compiler::: shouldEmit ::: SyncBailHook ::: compilation
Compiler::: emit ::: AsyncSeriesHook ::: compilation
Compiler::: assetEmitted ::: AsyncSeriesHook ::: file,content
Compiler::: afterEmit ::: AsyncSeriesHook ::: compilation
Compiler::: done ::: AsyncSeriesHook ::: stats

## webpack 执行流程
environment           设置node环境变量
afterEnvironment      设置环境变量完成
entryOption           解析入口文件
afterPlugins          挂载插件结束 webpack.config.js
afterResolvers        解析路径, 可以解析出绝对路径
beforeRun             编译之前
run                   开始编译
normalModuleFactory   创建普通模块工厂
contextModuleFactory  创建上下文模块工厂
beforeCompile         编译之前
compile               启动编译
thisCompilation       开始启动编译
compilation           创建一个compilation对象
make                  **核心代码, 从入口文件开始编译**
afterCompile          编译完成
shouldEmit            是否要生成编译文件
emit                  生成文件
assetEmitted          生成资源
afterEmit             完成生成
done                  结束整个编译

##  Compilation webpack/Compilation.js/line 439

Compilation::: addEntry ::: SyncHook ::: entry,name
Compilation::: buildModule ::: SyncHook ::: module
Compilation::: normalModuleLoader ::: SyncHook ::: loaderContext,module
Compilation::: succeedModule ::: SyncHook ::: module
Compilation::: succeedEntry ::: SyncHook ::: entry,name,module
Compilation::: finishModules ::: AsyncSeriesHook ::: modules
Compilation::: seal ::: SyncHook :::
Compilation::: optimizeDependenciesBasic ::: SyncBailHook ::: modules
Compilation::: optimizeDependencies ::: SyncBailHook ::: modules
Compilation::: optimizeDependenciesAdvanced ::: SyncBailHook ::: modules
Compilation::: afterOptimizeDependencies ::: SyncHook ::: modules
Compilation::: beforeChunks ::: SyncHook :::
Compilation::: log ::: SyncBailHook ::: origin,logEntry
Compilation::: log ::: SyncBailHook ::: origin,logEntry
Compilation::: afterChunks ::: SyncHook ::: chunks
Compilation::: optimize ::: SyncHook :::
Compilation::: optimizeModulesBasic ::: SyncBailHook ::: modules
Compilation::: optimizeModules ::: SyncBailHook ::: modules
Compilation::: optimizeModulesAdvanced ::: SyncBailHook ::: modules
Compilation::: afterOptimizeModules ::: SyncHook ::: modules
Compilation::: optimizeChunksBasic ::: SyncBailHook ::: chunks,chunkGroups
Compilation::: optimizeChunks ::: SyncBailHook ::: chunks,chunkGroups
Compilation::: optimizeChunksAdvanced ::: SyncBailHook ::: chunks,chunkGroups
Compilation::: afterOptimizeChunks ::: SyncHook ::: chunks,chunkGroups
Compilation::: optimizeTree ::: AsyncSeriesHook ::: chunks,modules
Compilation::: afterOptimizeTree ::: SyncHook ::: chunks,modules
Compilation::: optimizeChunkModulesBasic ::: SyncBailHook ::: chunks,modules
Compilation::: optimizeChunkModules ::: SyncBailHook ::: chunks,modules
Compilation::: optimizeChunkModulesAdvanced ::: SyncBailHook ::: chunks,modules
Compilation::: afterOptimizeChunkModules ::: SyncHook ::: chunks,modules
Compilation::: shouldRecord ::: SyncBailHook :::
Compilation::: reviveModules ::: SyncHook ::: modules,records
Compilation::: optimizeModuleOrder ::: SyncHook ::: modules
Compilation::: advancedOptimizeModuleOrder ::: SyncHook ::: modules
Compilation::: beforeModuleIds ::: SyncHook ::: modules
Compilation::: moduleIds ::: SyncHook ::: modules
Compilation::: optimizeModuleIds ::: SyncHook ::: modules
Compilation::: afterOptimizeModuleIds ::: SyncHook ::: modules
Compilation::: reviveChunks ::: SyncHook ::: chunks,records
Compilation::: optimizeChunkOrder ::: SyncHook ::: chunks
Compilation::: beforeChunkIds ::: SyncHook ::: chunks
Compilation::: optimizeChunkIds ::: SyncHook ::: chunks
Compilation::: afterOptimizeChunkIds ::: SyncHook ::: chunks
Compilation::: recordModules ::: SyncHook ::: modules,records
Compilation::: recordChunks ::: SyncHook ::: chunks,records
Compilation::: beforeHash ::: SyncHook :::
Compilation::: chunkHash ::: SyncHook ::: chunk,chunkHash
Compilation::: contentHash ::: SyncHook ::: chunk
Compilation::: afterHash ::: SyncHook :::
Compilation::: recordHash ::: SyncHook ::: records
Compilation::: beforeModuleAssets ::: SyncHook :::
Compilation::: shouldGenerateChunkAssets ::: SyncBailHook :::
Compilation::: beforeChunkAssets ::: SyncHook :::
Compilation::: chunkAsset ::: SyncHook ::: chunk,filename
Compilation::: additionalChunkAssets ::: SyncHook ::: chunks
Compilation::: record ::: SyncHook ::: compilation,records
Compilation::: additionalAssets ::: AsyncSeriesHook :::
Compilation::: optimizeChunkAssets ::: AsyncSeriesHook ::: chunks
Compilation::: afterOptimizeChunkAssets ::: SyncHook ::: chunks
Compilation::: optimizeAssets ::: AsyncSeriesHook ::: assets
Compilation::: afterOptimizeAssets ::: SyncHook ::: assets
Compilation::: needAdditionalSeal ::: SyncBailHook :::
Compilation::: afterSeal ::: AsyncSeriesHook :::
---
addEntry
buildModule
normalModuleLoader
succeedModule
succeedEntry
finishModules
seal
optimizeDependenciesBasic
optimizeDependencies
optimizeDependenciesAdvanced
afterOptimizeDependencies
beforeChunks
log
log
afterChunks
optimize
optimizeModulesBasic
optimizeModules
optimizeModulesAdvanced
afterOptimizeModules
optimizeChunksBasic
optimizeChunks
optimizeChunksAdvanced
afterOptimizeChunks
optimizeTree
afterOptimizeTree
optimizeChunkModulesBasic
optimizeChunkModules
optimizeChunkModulesAdvanced
afterOptimizeChunkModules
shouldRecord
reviveModules
optimizeModuleOrder
advancedOptimizeModuleOrder
beforeModuleIds
moduleIds
optimizeModuleIds
afterOptimizeModuleIds
reviveChunks
optimizeChunkOrder
beforeChunkIds
optimizeChunkIds
afterOptimizeChunkIds
recordModules
recordChunks
beforeHash
chunkHash
contentHash
afterHash
recordHash
beforeModuleAssets
shouldGenerateChunkAssets
beforeChunkAssets
chunkAsset
additionalChunkAssets
record
additionalAssets
optimizeChunkAssets
afterOptimizeChunkAssets
optimizeAssets
afterOptimizeAssets
needAdditionalSeal
afterSeal
needAdditionalPass

## 命令
--profile<显示性能数据>
--json<输出json>
npx webpack --profile --json > stats.json