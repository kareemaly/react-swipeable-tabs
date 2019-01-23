import React from 'react';
import autoprefixer from './prefixer';
import TabListItem from './TabListItem';

export default class TabList extends React.Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(React.PropTypes.shape({
      element: React.PropTypes.element.isRequired,
      width: React.PropTypes.number.isRequired,
      left: React.PropTypes.number.isRequired,
    })).isRequired,
    alignCenter: React.PropTypes.bool,
    onItemChange: React.PropTypes.func.isRequired,
    itemStyle: React.PropTypes.object,
    fitItems: React.PropTypes.bool,
    onItemClick: React.PropTypes.func.isRequired,
    noFirstLeftPadding: React.PropTypes.bool,
    noLastRightPadding: React.PropTypes.bool,
    itemClassName: React.PropTypes.string,
    containerWidth: React.PropTypes.number,
    activeStyle: React.PropTypes.object.isRequired,
    isItemActive: React.PropTypes.func.isRequired,
    createMarginWidth: React.PropTypes.number.isRequired,
  };

  /**
   * Return true if the item is the first one in the list
   * @param  {object}  item
   * @return {Boolean}
   */
  isFirstItem(item) {
    return this.props.items[0] === item;
  }

  /**
   * Return true if the item is the last one
   * @param  {object}  item
   * @return {Boolean}
   */
  isLastItem(item) {
    return this.props.items.indexOf(item) === this.props.items.length - 1;
  }

  /**
   * Calculate list width from its elements
   * @return {number}
   */
  getListWidth() {
    let totalWidth = 0;
    this.props.items.forEach(item => totalWidth += item.width + this.props.createMarginWidth);
    return totalWidth;
  }

  /**
   * Return true if the list width is smaller than window
   * @return {Boolean}
   */
  isListSmallerThanWindow() {
    return this.getListWidth() < this.props.containerWidth;
  }

  getListStyle() {
    return autoprefixer({
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'row',
      margin: 0,
      padding: 0,
      justifyContent: this.props.alignCenter && this.isListSmallerThanWindow() ? 'center' : undefined,
    });
  }

  renderListItems() {
    return this.props.items.map((item, key) => (
      <TabListItem
        key={key}
        item={item}
        style={this.props.itemStyle}
        fitInContainer={this.props.fitItems}
        onClick={this.props.onItemClick}
        className={this.props.itemClassName}
        noLeftPadding={this.props.noFirstLeftPadding && this.isFirstItem(item)}
        noRightPadding={this.props.noLastRightPadding && this.isLastItem(item)}
        onChange={this.props.onItemChange}
        isItemActive={this.props.isItemActive}
        activeStyle={this.props.activeStyle}
        createMarginWidth={this.props.createMarginWidth}
      />
    ));
  }

  render() {
    return (
      <ul style={this.getListStyle()}>
        {this.renderListItems()}
      </ul>
    );
  }
}
