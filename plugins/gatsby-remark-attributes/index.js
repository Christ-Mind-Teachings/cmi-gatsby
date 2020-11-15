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
const visit = require("unist-util-visit");
const toString = require("mdast-util-to-string");

/*
 * Mode = "cmi", assign paragraph number as id to all paragraphs
 * that don't include className.
 */
function updateParagraph(options, node, classes = "", id = "", para) {
  const { mode = "", className = "" } = options;

  if (mode === "cmi") {
    if (!classes.includes(className)) {
      //add pid and .cmiTranPara, ignore id passed into function
      id = `p${++pNum}`;
      if (classes === "") {
        classes = "cmiTranPara";
      }
      else {
        classes = `cmiTranPara ${classes}`; 
      }
    }
  }

  if (classes === "" && id === "") {
    return;
  }

  //build attribute list and add to paragraph
  let attrList = "";

  attrList = `${classes !== "" ? `class='${classes}'` : ""}`;
  attrList = `${attrList}${id !== "" ? ` id='${id}'` : ""}`;
  para = `<p ${attrList}> ${para} </p>`;

  node.type = "html";
  node.children = undefined;
  node.value = para;
}

let pNum;
let id = "";

module.exports = ({ markdownAST, markdownNode }, options) => {

  if (markdownNode.id !== id) {
    id = markdownNode.id;
    pNum = 0;
  }

  visit(markdownAST, "paragraph", (node) => {
    let para = toString(node);
    let id = "";
    let classes = "";

    const pattern = /{:(.*)}/g;
    const matches = para.matchAll(pattern);
    const matchesArray = [...matches];

    //iterate over the capture group and get classes and id
    for (const match of matchesArray) {

      //remove matched pattern
      para = para.replace(match[0], "");

      //get attributes from group
      const attributes = match[1].matchAll(/([.#]\w+)/g);

      //gather attributes into classes and id
      for (const attr of attributes) {
        if (attr[1][0] === ".") {
          if (classes === "") {
            classes = `${attr[1].substring(1)}`;
          }
          else {
            classes = `${classes} ${attr[1].substring(1)}`;
          }
        }
        else if (attr[1][0] === "#") {
          id = attr[1].substring(1);
        }
      }
    }
    //potentially update paragraph
    updateParagraph(options, node, classes, id, para);
  });

  return markdownAST;
}

