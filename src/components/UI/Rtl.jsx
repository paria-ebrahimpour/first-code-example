import { StyleSheetManager } from 'styled-components';
import rtlPlugin from 'stylis-plugin-rtl';

function Rtl(props) {
  return (
    <StyleSheetManager stylisPlugins={[rtlPlugin]}>
      {props.children}
    </StyleSheetManager>
  );
}

export default Rtl