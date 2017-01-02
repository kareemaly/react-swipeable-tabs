import Tabs from './index';
import React from 'react';
import { Slider, RaisedButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const maxStiffness = 300;
const maxResistanceCoefficenet = 1;
const maxDamping = 50;
const maxSafeMargin = 200;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomItems = (no) => {
  const items = [];
  for (var i = 1; i <= no; i++) {
    items.push({ title: 'Item ' + getRandomInt(i * 5, i * 10) })
  }
  return items;
}

export default class TabsTest extends React.Component {

  componentWillMount() {
    this.setState({
      activeItemIndex: 2,
      stiffness: 170,
      resistanceCoeffiecent: 0.5,
      damping: 26,
      safeMargin: 60,
      items: createRandomItems(14)
    })
  }


  renderTabs() {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Tabs
          noFirstLeftPadding={false}
          noLastRightPadding={false}
          fitItems={false}
          resistanceCoeffiecent={this.state.resistanceCoeffiecent}
          stiffness={this.state.stiffness}
          damping={this.state.damping}
          safeMargin={this.state.safeMargin}
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
      </div>
    );
  }

  getToolsContainerStyle() {
    return { justifyContent: 'space-around', display: 'flex' };
  }

  getToolStyle() {
    return { background: '#EEE', padding: '20px 5px' };
  }

  renderGlobalTools() {
    return (
      <div style={this.getToolsContainerStyle()}>
        <div style={this.getToolStyle()}>
          <b style={{ fontSize: '0.8rem' }}>Stiffness</b><br />
          <Slider
            style={{height: 100}}
            axis="y"
            onChange={(e, value) => this.setState({ stiffness: value*maxStiffness })}
            value={this.state.stiffness/maxStiffness} />
          <br />
          {this.state.stiffness.toFixed(1)}
        </div>
        <div style={this.getToolStyle()}>
          <b style={{ fontSize: '0.8rem' }}>Damping</b><br />
          <Slider
            style={{height: 100}}
            axis="y"
            onChange={(e, value) => this.setState({ damping: value*maxDamping })}
            value={this.state.damping/maxDamping} />
          <br />
          {this.state.damping.toFixed(1)}
        </div>
      </div>
    );
  }

  renderSwipeTools() {
    return (
      <div style={this.getToolsContainerStyle()}>
        <div style={this.getToolStyle()}>
          <b style={{ fontSize: '0.8rem' }}>Resistance</b><br />
          <Slider
            style={{height: 100}}
            axis="y"
            onChange={(e, value) => this.setState({ resistanceCoeffiecent: value*maxResistanceCoefficenet })}
            value={this.state.resistanceCoeffiecent/maxResistanceCoefficenet} />
          <br />
          {this.state.resistanceCoeffiecent.toFixed(3)}
        </div>
        <div style={this.getToolStyle()}>
          <b style={{ fontSize: '0.8rem' }}>SafeMargin</b><br />
          <Slider
            style={{height: 100}}
            axis="y"
            onChange={(e, value) => this.setState({ safeMargin: value*maxSafeMargin })}
            value={this.state.safeMargin/maxSafeMargin} />
          <br />
          {this.state.safeMargin.toFixed(1)}
        </div>
      </div>
    );
  }

  changeItems() {
    this.setState({
      items: createRandomItems(10),
    })
  }

  changeActiveItem3() {
    this.setState({
      activeItemIndex: 3
    })
  }

  renderDynamicTools() {
    const style = { margin: 12 };
    return (
      <div>
        <RaisedButton onClick={this.changeItems.bind(this)} label="Change items" style={style} />
        <RaisedButton onClick={this.changeActiveItem3.bind(this)} label="Change active to the fourth item" style={style} />
      </div>
    );
  }

  renderTools() {
    const titleStyle = { textAlign: 'center', backgroundColor: '#EEE', padding: 20  };

    return (
      <div>
        <h1 style={titleStyle}>Dynamic?</h1>
        {this.renderDynamicTools()}
        <h1 style={titleStyle}>Animation values</h1>
        {this.renderGlobalTools()}
        <h1 style={titleStyle}>Swipe values</h1>
        {this.renderSwipeTools()}
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          {this.renderTabs()}
          <br />
          <br />
          <br />
          {this.renderTools()}
        </div>
      </MuiThemeProvider>
    );
  }
}