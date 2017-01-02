import React from 'react';
import Hammer from 'react-hammerjs';
import { Motion, spring } from 'react-motion';
import differenceBy from 'lodash.differenceby';
import ListBorder from './ListBorder';
import TabList from './TabList';
import autoprefixer from './prefixer';
import Animator from './Animator';

export default class Tabs extends React.Component {
  static propTypes = {
    resistanceCoeffiecent: React.PropTypes.number,
    stiffness: React.PropTypes.number,
    damping: React.PropTypes.number,
    activeItemIndex: React.PropTypes.number,
    items: React.PropTypes.array.isRequired,
    safeMargin: React.PropTypes.number,
    onItemClick: React.PropTypes.func.isRequired,
    borderPosition: React.PropTypes.oneOf(['top', 'bottom']),
    borderColor: React.PropTypes.string,
    borderThickness: React.PropTypes.number,
    borderWidthRatio: React.PropTypes.number,
    alignCenter: React.PropTypes.bool,
    activeStyle: React.PropTypes.object,
    /**
     * This option will fit all items on desktop
     */
    fitItems: React.PropTypes.bool,
    /**
     * This prop defines if the first item doesnt have left padding.
     * We use this to calculate the border position for the first element.
     */
    noFirstLeftPadding: React.PropTypes.bool,
    /**
     * This prop defines if the last item doesnt have right padding.
     * We use this to calculate the border position for the last element.
     */
    noLastRightPadding: React.PropTypes.bool,
    itemClassName: React.PropTypes.string,
    itemStyle: React.PropTypes.object,
    initialTranslation: React.PropTypes.number,
  };

  static defaultProps = {
    resistanceCoeffiecent: 0.5,
    gravityAccelarion: 9.8,
    dragCoefficient: 0.04,
    stiffness: 170,
    damping: 26,

    activeItemIndex: 0,
    safeMargin: 100,
    borderPosition: 'bottom',
    borderColor: '#333',
    borderThickness: 2,
    borderWidthRatio: 1,
    alignCenter: true,
    activeStyle: {},
    noFirstLeftPadding: false,
    noLastRightPadding: false,
    fitItems: false,
    itemStyle: {},
    initialTranslation: 0,
  };

  constructor(props) {
    super(props);
    this.currentFrame = {
      translateX: 0,
    };

    const items = this.formatItems(this.props.items);

    this.animator = new Animator(items);
    this.updateAnimatorFromProps(this.props);

    this.state = {
      items,
      activeItemIndex: this.props.activeItemIndex,
      translateX: 0,
      borderWidth: 0,
      borderTranslateX: 0,
    };
  }

  onResize() {
    // Force center active item on resize
    this.setState({
      requestCenterActiveItem: true
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    this.updateAnimatorFromProps(nextProps);

    if(nextProps.activeItemIndex !== this.props.activeItemIndex) {
      this.setState({ activeItemIndex: nextProps.activeItemIndex });
    }

    if(!this.checkEqualItems(nextProps.items, this.props.items)) {
      const items = this.formatItems(nextProps.items);
      this.animator.setItems(items);
      this.setState({ items });
    }
  }

  formatItems(items) {
    return items.map(item => ({...item, width: 0, left: 0}));
  }

  checkEqualItems(items1, items2) {
    return items1.length === items2.length && differenceBy(items1, items2, item => item.title).length === 0;
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.activeItemIndex !== this.state.activeItemIndex
      || nextState.requestCenterActiveItem
      || nextState.items !== this.state.items) {
      // 
      this.setState({
        ...this.getCenterItemState(nextState.items, nextState.activeItemIndex),
        requestCenterActiveItem: false,
      });
    }
  }

  onPanStart(e) {
    this.animator.startDrag();
  }

  onPanEnd(e) {
    this.animator.endDrag();

    // 
    this.setState({
      translateX: this.animator.calculateSwipeReleaseTranslateX(e.deltaX),
    });
  }

  onPan(e) {
    this.setState({
      translateX: this.animator.calculateSwipeTranslateX(e.deltaX),
    });
  }

  getTranslateStyle(translateX) {
    this.animator.setCurrentTranslateX(translateX);
    return {
      transform: `translate(${translateX}px, 0)`
    };
  }

  getContainerStyle() {
    return autoprefixer({
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      textAlign: 'center',
    });
  }

  getCenterItemState(items, activeItemIndex) {
    let item = items[activeItemIndex];
    // If item doesnt exist then revert to the first item and call the onItemClick
    if(! item) {
      item = items[0];
      this.onItemClick(item, activeItemIndex);
    }
    return {
      borderWidth: this.animator.getBorderWidth(item),
      translateX: this.animator.calculateItemTranslateX(item),
      borderTranslateX: this.animator.calculateBorderTranslateX(item),
    };
  }

  updateAnimatorFromProps(props) {
    this.animator.setBorderWidthRatio(props.borderWidthRatio);
    this.animator.setSafeMargin(props.safeMargin);
    this.animator.setInitialTranslation(props.initialTranslation);
    this.animator.setNoFirstLeftPadding(props.noFirstLeftPadding);
    this.animator.setNoLastRightPadding(props.noLastRightPadding);
    this.animator.setResistanceCoeffiecent(props.resistanceCoeffiecent);
  }

  getInitialFrame() {
    return {
      translateX: this.state.translateX,
      borderWidth: this.state.borderWidth,
      borderTranslateX: this.state.borderTranslateX,
    };
  }

  calculateNextFrame() {
    const options = {
      stiffness: this.props.stiffness,
      damping: this.props.damping,
    };
    return {
      translateX: spring(this.state.translateX, options),
      borderTranslateX: spring(this.state.borderTranslateX, options),
      borderWidth: spring(this.state.borderWidth, options),
    };
  }

  refContainerWidthDetector(ref) {
    if(ref) {
      this.animator.setContainerWidth(ref.clientWidth);
    }
  }

  onItemClick(item) {
    const index = this.getItemIndex(item);
    this.setState({
      requestToCenterItem: true,
      activeItemIndex: index,
    });
    this.props.onItemClick(item, index);
  }

  onItemChange(item, width, left) {
    const index = this.state.items.indexOf(item);

    const items = [
      ...this.state.items.slice(0, index),
      { ...item, width, left },
      ...this.state.items.slice(index + 1),
    ];

    this.animator.setItems(items);
    this.setState({ items });
  }

  isItemActive(item) {
    return this.state.activeItemIndex === this.getItemIndex(item);
  }

  getItemIndex(item) {
    return this.state.items.indexOf(item);
  }

  renderList(translateX, borderTranslateX, borderWidth) {
    const borderElement = (
      <ListBorder
        borderThickness={this.props.borderThickness}
        borderColor={this.props.borderColor}
        borderTranslateX={borderTranslateX}
        borderWidth={borderWidth}
      />
    );

    return (
      <div style={this.getTranslateStyle(translateX)}>
        {this.props.borderPosition === 'top' ? borderElement : null}

        <TabList
          items={this.state.items}
          containerWidth={this.animator.getContainerWidth()}
          alignCenter={this.props.alignCenter}
          itemStyle={this.props.itemStyle}
          fitItems={this.props.fitItems}
          onItemClick={this.onItemClick.bind(this)}
          onItemChange={this.onItemChange.bind(this)}
          noFirstLeftPadding={this.props.noFirstLeftPadding}
          noLastRightPadding={this.props.noLastRightPadding}
          itemClassName={this.props.itemClassName}
          activeStyle={this.props.activeStyle}
          isItemActive={this.isItemActive.bind(this)}
        />

        {this.props.borderPosition === 'bottom' ? borderElement : null}
      </div>
    );
  }

  render() {
    return (
      <Hammer
        onPanStart={this.onPanStart.bind(this)}
        onPanEnd={this.onPanEnd.bind(this)}
        onPan={this.onPan.bind(this)}>
        <div
          ref={this.refContainerWidthDetector.bind(this)}
          style={this.getContainerStyle()}>
          <Motion
            onRest={() => {
              console.log("ON REST");
            }}
            defaultStyle={this.getInitialFrame()}
            style={this.calculateNextFrame()}>
            {({ translateX, borderTranslateX, borderWidth }) =>
              this.renderList(translateX, borderTranslateX, borderWidth)}
          </Motion>
        </div>
      </Hammer>
    );
  }
}