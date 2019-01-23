import React from 'react';
import autoprefixer from './prefixer';

export default class TabListItem extends React.Component {
  static propTypes = {
    item: React.PropTypes.shape({
      element: React.PropTypes.element.isRequired,
      width: React.PropTypes.number.isRequired,
      left: React.PropTypes.number.isRequired,
    }).isRequired,
    onChange: React.PropTypes.func.isRequired,
    style: React.PropTypes.object,
    fitInContainer: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    noLeftPadding: React.PropTypes.bool,
    noRightPadding: React.PropTypes.bool,
    className: React.PropTypes.string,
    isItemActive: React.PropTypes.func.isRequired,
    activeStyle: React.PropTypes.object.isRequired,
    createMarginWidth: React.PropTypes.number.isRequired,
  };

  checkChanged = (width, left) => {
    return this.props.item.width !== width || this.props.item.left !== left;
  }

  refListItemDetector = (ref) => {
    if(! ref) {
      return;
    }
    // New change has happened
    if(this.checkChanged(ref.clientWidth, ref.offsetLeft)) {
      this.props.onChange(this.props.item, ref.clientWidth, ref.offsetLeft);
    }
  }

  getItemStyle() {
    let style = {...this.props.style};

    // Fitting item in the container
    if(this.props.fitInContainer) {
      style.flexShrink = 1;
      style.flexGrow = 1;
    } else {
      style.flexShrink = 0;
    }

    // Remove left padding
    if(this.props.noLeftPadding) {
      style.paddingLeft = 0;
      style.justifyContent = 'flex-start';
    }

    // Remove right padding
    if(this.props.noRightPadding) {
      style.paddingRight = 0;
      style.justifyContent = 'flex-end';
    }

    if(this.props.isItemActive(this.props.item)) {
      style = { ...style, ...this.props.activeStyle };
    }

    const mainItemStyle = {
      padding: '20px',
      margin: `0px ${this.props.createMarginWidth/2}px`,
      cursor: 'pointer',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    console.log(mainItemStyle)

    return autoprefixer({
      ...mainItemStyle,
      ...style,
    });
  }

  render() {
    return (
      <li
        ref={this.refListItemDetector.bind(this)}
        onClick={() => this.props.onClick(this.props.item)}
        style={this.getItemStyle()}
        className={this.props.className}
      >
        {this.props.item.element}
      </li>
    );
  }
}
