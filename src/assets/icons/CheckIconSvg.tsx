import React, { memo } from "react";
import { SvgCss } from "react-native-svg";
const CheckIconSvg = ({ height = 15.715, width = 22 }) => {
  const xml = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 22 15.715">
  <g id="check_-_plain" data-name="check - plain" transform="translate(-9 -11.6)">
    <path id="check-solid" d="M53.465,96.485a1.574,1.574,0,0,1,0,2.224l-12.57,12.57a1.574,1.574,0,0,1-2.224,0l-6.285-6.285a1.573,1.573,0,0,1,2.224-2.224l5.175,5.17,11.46-11.455a1.574,1.574,0,0,1,2.224,0Z" transform="translate(-22.925 -84.425)" fill="#f37421"/>
  </g>
</svg>
`;
  return <SvgCss xml={xml} />;
};

export default memo(CheckIconSvg);
