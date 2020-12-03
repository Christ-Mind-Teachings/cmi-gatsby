/**
 * Remark plugin
 *
 * Looks for token '{:<one or more class names or id>}' in paragraphs and adds the specified
 * attributes to the <p> tag.
 *
 * Class names are preceded with a '.' and id's with a '#'. If multiple id's are specified the
 * last one is used.
 *
 * The plugin takes options, mode and className. The only valid value of mode is "cmi". This will
 * add an id of the paragraph number ie p12, and a class of "cmiTranPara" in addition to other classes
 * specified by the directive ie {: .class #id}.
 *
 * The id and .cmiTranPara will not be added when the className option is the same as a class in
 * the directive, ie {: .omit} and mode = "cmi" and className = "omit"
 */
const visit = require('unist-util-visit');

let pid;
let uuid = '';

module.exports = ({ markdownAST, markdownNode }, options) => {
  // reset pNum each time we process a new md file
  if (markdownNode.id !== uuid) {
    uuid = markdownNode.id;
    pid = 1;
  }
  visit(markdownAST, 'paragraph', (node) => {
    const lastChild = node.children[node.children.length - 1];
    if (lastChild && lastChild.type === 'text') {
      let string = lastChild.value.replace(/ +$/, '');
      const matched = string.match(/{:(.*)}$/);
      let classes = '';
      let id = '';
      if (matched) {
        const spec = matched[1];
        if (spec.length) {
          if (!node.data) {
            node.data = {};
          }
          if (!node.data.hProperties) {
            node.data.hProperties = {};
          }

          const attributes = spec.matchAll(/([.#]\w+)/g);
          for (const attr of attributes) {
            if (attr[1][0] === '.') {
              if (classes === '') {
                classes = `${attr[1].substring(1)}`;
              } else {
                classes = `${classes} ${attr[1].substring(1)}`;
              }
            } else if (attr[1][0] === '#') {
              id = attr[1].substring(1);
            }
          }

          if (id.length > 0) {
            node.data.hProperties.id = id;
            node.data.id = id;
          }

          if (classes.length > 0) {
            node.data.hProperties.className = classes;
            node.data.className = classes;
          }

          string = string.substring(0, matched.index);
          lastChild.value = string;
        }
      }

      // number all paragraphs sequentially starting with 1 and assign
      // the number as the id unless options.className is specified
      // in {: .class} directive
      if (options.mode === 'cmi') {
        if (options.className) {
          if (!node.data) {
            node.data = {};
          }
          if (!node.data.hProperties) {
            node.data.hProperties = {};
          }
          if (
            !node.data.className ||
            !node.data.className.includes(options.className)
          ) {
            // add sequential id
            node.data.hProperties.id = `p${pid}`;
            node.data.id = `p${pid}`;
            pid += 1;

            // add class 'cmiTranPara'
            const classList = node.data.className
              ? `cmiTranPara ${node.data.className}`
              : 'cmiTranPara';

            node.data.className = classList;
            node.data.hProperties.className = classList;

            // add <span> as the first item in children[]
            const span = {
              type: 'emphasis',
              data: {
                hName: 'span',
                hProperties: { className: 'special' },
              },
            };

            node.children.unshift(span);
          }
        }
      }
    }
  });

  return markdownAST;
};
