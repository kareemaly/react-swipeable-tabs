import React from 'react';
import autoprefixer from './prefixer';

export default class ListBorder extends React.Component {
  static propTypes = {
    borderThickness: React.PropTypes.number,
    borderColor: React.PropTypes.string,
    borderWidth: React.PropTypes.number,
    borderTranslateX: React.PropTypes.number,
  };

  getBorderStyle() {
    return autoprefixer({
      height: this.props.borderThickness,
      background: this.props.borderColor,
      width: this.props.borderWidth,
      transform: `translate(${this.props.borderTranslateX}px, 0)`,
    });
  }

  render() {
    return (
      <div
        style={this.getBorderStyle()}>
      </div>
    );
  }
}