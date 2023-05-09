import React from "react";

const escape = (str: string) =>
  typeof str === "string"
    ? str.replace(new RegExp('"', "g"), "&quot;")
    : String(str);

export type TextTemplateTokenDict = {
  /**
   * it should be an element of TextView component
   */
  [key: string]: JSX.Element | string | { toString: () => string };
};

const getTextTemplate = (
  template: string,
  tokenDict: TextTemplateTokenDict,
) => {
  // "extract" tokens in template by splitting on token pattern
  //   so "you have {COUNT} friends in common with {NAME} "
  //   becomes ['you have', '{COUNT}', 'friends in common with', '{NAME}']
  const templateParts = template.split(/(\{.+?\})/);
  // loop over templateParts and replace tokens with corresponding values
  //   from tokenDict
  const keyRegex = /\{(.+?)\}/;
  let jsxKeyCount = 0;
  let foundJsx = false;
  const renderedParts = templateParts.reduce((arr, part) => {
    if (!part.length) {
      return arr;
    }
    if (!part.match(keyRegex)) {
      // part is plain string.
      return arr.concat(part);
    }

    const key = part.match(keyRegex)?.[1];
    const val = key && tokenDict[key];
    // if the value is a react element, add a key and concat
    if (React.isValidElement(val)) {
      foundJsx = true;
      const jsxval = React.cloneElement(val, {
        key: jsxKeyCount,
      });
      jsxKeyCount += 1;
      return arr.concat(jsxval);
    }
    // if key isn't in the dict, leave the string alone
    if (typeof val === "undefined" || val === null) {
      return arr.concat(part);
    }
    // otherwise, treat it as a literal
    return arr.concat(escape(val as string));
  }, [] as (JSX.Element | string)[]);

  if (foundJsx) {
    // join consecutive string elements
    //   so ['you have ', '50', ' friends in common with', <Link href="/joe">Joe</Link>]
    //   becomes ['you have 50 friends in common with', <Link href="/joe">Joe</Link>]
    let strAccum = "";
    return renderedParts
      .reduce((arr, part) => {
        if (typeof part !== "string") {
          if (!strAccum.length) {
            return arr.concat(part);
          }
          const flushedStr = strAccum;
          strAccum = "";
          return arr.concat([flushedStr, part]);
        }
        strAccum = strAccum.concat(part);
        return arr;
      }, [] as (JSX.Element | string)[])
      .concat(strAccum);
  }

  return renderedParts.join("");
};

export type TextTemplateResult = ReturnType<typeof getTextTemplate>;

export default getTextTemplate;
