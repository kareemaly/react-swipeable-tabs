react-swipeable-tabs
---------------

Installing
------------
```
$ npm install react-swipeable-tabs --save
```

[Demos](http://bitriddler.com/playground/swipeable-tabs)
--------------

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



| Property | Type | Default | Description |
| --- | --- | --- | --- |
| resistanceCoeffiecent | number | 0.5 |  |
| gravityAccelarion | number | 9.8 |  |
| dragCoefficient | number | 0.04 |  |
| stiffness | number | 170 |  |
| damping | number | 26 |  |
| activeItemIndex | number | 0 |  |
| items* | array |  |  |
| safeMargin | number | 100 |  |
| onItemClick* | func |  |  |
| borderPosition | enum | 'bottom' |  |
| borderColor | string | '#333' |  |
| borderThickness | number | 2 |  |
| borderWidthRatio | number | 1 |  |
| alignCenter | bool | true |  |
| activeStyle | object | {} |  |
| fitItems | bool | false | This option will fit all items on desktop |
| noFirstLeftPadding | bool | false | This prop defines if the first item doesnt have left padding.<br />We use this to calculate the border position for the first element. |
| noLastRightPadding | bool | false | This prop defines if the last item doesnt have right padding.<br />We use this to calculate the border position for the last element. |
| itemClassName | string |  |  |
| itemStyle | object | {} |  |
| initialTranslation | number | 0 |  |

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
