module.exports = function render(locals) {

  /**
   * Those are running for every file in pages folder. It
   * would be nice if we could cache and reuse the header/footer/etc...
   */
  const header = require(`ejs-loader!./components/header.html`)(locals);
  const footer = require(`ejs-loader!./components/footer.html`)(locals);

  const content = require(`ejs-loader!./pages${locals.path}`)(locals);

  const layout = require(`ejs-loader!./components/layout.html`);

  return layout({
    header,
    footer,
    content,
    style: `${locals.webpackStats.hash}.css`,
    scripts: locals.assets
  })
};
