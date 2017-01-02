import React from 'react';
import ReactDOM from 'react-dom';
import TabsTest from './Tabs/test';

// Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(<TabsTest />, document.getElementById("root"));