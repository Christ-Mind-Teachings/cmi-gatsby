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
 *
 * Note: in some cases paragraphs that should be assigned a sequential id and class of .cmiTranPara
 *       are not and I don't know why. I need to find a way to check for that because it will break
 *       audio playback highlighs and marking of search results.
 */
const visit = require('unist-util-visit');

let pid;
let uuid = '';

module.exports = ({ markdownAST, markdownNode }, options) => {
  // reset pNum each time we process a new md file
  if (markdownNode.id !== uuid) {
    uuid = markdownNode.id;
    pid = 0;
  }
  visit(markdownAST, 'paragraph', (node) => {
    const lastChild = node.children[node.children.length - 1];
    let classes = '';
    let id = '';

    // increment pid for each paragraph
    pid += 1;

    // look for {: .class#id} at end of paragraph
    if (lastChild && lastChild.type === 'text') {
      let string = lastChild.value.replace(/ +$/, '');
      const matched = string.match(/{:(.*)}$/);

      if (matched) {
        const spec = matched[1];

        // add data and hProperties objects to paragraph node
        if (spec.length) {
          if (!node.data) {
            node.data = {};
          }
          if (!node.data.hProperties) {
            node.data.hProperties = {};
          }

          // get the attributes from the directive {: <atts>}
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

          // if there is an id add it to hProperties, if multiple id's
          // are specified only the last one is added
          if (id.length > 0) {
            node.data.hProperties.id = id;
            node.data.id = node.data.hProperties.id;
          }

          // if there were class(es) add them to data
          if (classes.length > 0) {
            node.data.hProperties.className = classes;
            node.data.className = node.data.hProperties.className;
          }

          // remove the directive from the Markdown
          string = string.substring(0, matched.index);
          lastChild.value = string;
        }
      }
    }

    /*
     * In 'cmi' mode all paragraphs are given a sequential id starting at 1 unless
     * the paragraph contains a directive containing a class equal to
     * options.className, then it is skipped.
     *
     * eg: {: .omit} will not add the id to the paragraph when
     *               options.className = 'omit'
     *
     * Note that the pid is incremented for every paragraph, even skipped ones.
     */
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
          node.data.hProperties.id = `p${pid}`;
          node.data.id = node.data.hProperties.id;

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
  });

  return markdownAST;
};
