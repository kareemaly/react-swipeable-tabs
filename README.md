react-swipeable-tabs
---------------

Installing
------------
```
$ npm install react-swipeable-tabs --save
```

Demo
------------
<img src="https://raw.githubusercontent.com/kareem3d/react-swipeable-tabs/master/demo.gif" width="600">

Example
--------------

```javascript
import React from 'react';
import SwipeableTabs from 'react-swipeable-tabs';

export default class TestTabs extends React.Component {
  componentWillMount() {
    this.setState({
      activeItemIndex: 2,
      items: [
        { title: "Item 1" },
        { title: "Item 2" },
        { title: "Item 3" },
        { title: "Item 4" },
        { title: "Item 5" },
        { title: "Item 6" },
        { title: "Item 7" },
        { title: "Item 8" },
        { title: "Item 9" },
        { title: "Item 10" },
        { title: "Item 11" },
        { title: "Item 12" },
      ]
    });
  }

  render() {
    return (
      <SwipeableTabs
        noFirstLeftPadding={false}
        noLastRightPadding={false}
        fitItems={false}
        alignCenter={false}
        borderWidthRatio={1}
        activeItemIndex={this.state.activeItemIndex}
        onItemClick={(item, index) => this.setState({ activeItemIndex: index })}
        items={this.state.items}
        borderPosition="top"
        borderThickness={2}
        borderColor="#4dc4c0"
        activeStyle={{
          color: '#4dc4c0'
        }}
      />
    );  
  }
} 
```

Contributing
--------------
To contribute, follow these steps:
- Fork this repo.
- Clone your fork.
- Run `npm install`
- Run `npm start`
- Goto `localhost:3000`
- Add your patch then push to your fork and submit a pull request

License
---------
MIT
