const rules = [
  'link_open',
  'heading_open'
]

module.exports = (options, ctx) => {
  const { themeConfig } = ctx

  const enableSmoothScroll = themeConfig.smoothScroll === true

  return {
    plugins: [
      ['@vuepress/active-header-links', options.activeHeaderLinks],
      '@vuepress/search',
      '@vuepress/plugin-nprogress',
      ['container', {
        type: 'tip',
        defaultTitle: {
          '/': 'TIP',
          '/zh/': '提示'
        }
      }],
      ['container', {
        type: 'warning',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '注意'
        }
      }],
      ['container', {
        type: 'danger',
        defaultTitle: {
          '/': 'WARNING',
          '/zh/': '警告'
        }
      }],
      ['container', {
        type: 'details',
        before: info => `<details class="custom-block details">${info ? `<summary>${info}</summary>` : ''}\n`,
        after: () => '</details>\n'
      }],
      ['smooth-scroll', enableSmoothScroll]
    ],
    extendMarkdown: md => {
      for (const rule of rules) {
        md.renderer.rules[rule] = (tokens, index, options, env, renderer) => {
          tokens[index].attrJoin('class', 'brooks')
          return renderer.renderToken(tokens, index, options)
        }
      }
      return md.use(require('markdown-it-task-lists'), { enabled: true })
    }
  }
}
