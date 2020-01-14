class PrefetchPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("PrefetchPlugin", compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        "PrefetchPlugin",
        (htmlData, callback) => {
          // console.log(htmlData)
          // 所有的chunks都保存在compilation中的chunks
          const chunksMap = {};
          const tags = [];
          compilation.chunks.forEach(chunk => {
            chunksMap[chunk.id] = chunk;
          });
          compilation.chunks.forEach(chunk => {
            // console.info(chunk.getChildIdsByOrders().prefetch)
            const getChild = chunk.getChildIdsByOrders().prefetch;
            if (getChild) {
              getChild.forEach(prefetchChunkId => {
                const files = chunksMap[prefetchChunkId].files;
                files.forEach(file => {
                  tags.push({
                    tagName: "link",
                    closeTag: true,
                    attributes: { rel: "prefetch", as: "script", href: file }
                  });
                });
              });
            }
          });
          htmlData.head.push(...tags);
          // htmlData.head.push(
          //   {
          //     tagName: 'link', closeTag: true,
          //     attributes: { rel: "prefetch", as: "script", href: 'a.js' }
          //   },
          //   {
          //     tagName: 'link', closeTag: true,
          //     attributes: { rel: "prefetch", as: "script", href: 'b.js' }
          //   },
          // );
          callback();
        }
      );
    });
  }
}
/**
 * compilation
 * 监听钩子函数
 * compilation.hooks.htmWebpackPluginAlterAssetsTags = new AsyncSeriesWaterfallHook()
 * 所有的chunks都保存在compilation中的chunks
 */
module.exports = PrefetchPlugin;
