import Tabs from './index';
import React from 'react';
import { Slider, RaisedButton } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const CubesIcon = props => (
  <svg viewBox="0 0 40 40" {...props}>
    <g><path d="m11.7 33.4l7-3.5v-5.7l-7 3v6.2z m-1.2-8.3l7.4-3.1-7.4-3.2-7.4 3.2z m19.8 8.3l7-3.5v-5.7l-7 3v6.2z m-1.1-8.3l7.3-3.1-7.3-3.2-7.4 3.2z m-8.2-5.3l7-3v-4.9l-7 3v4.9z m-1.2-6.9l8.1-3.5-8.1-3.4-8 3.5z m19.8 9.4v7.6q0 0.7-0.3 1.2t-0.9 0.9l-8.2 4.1q-0.5 0.2-1 0.2t-1.1-0.2l-8.1-4.1q-0.1 0-0.2-0.1 0 0.1-0.1 0.1l-8.2 4.1q-0.4 0.2-1 0.2t-1-0.2l-8.2-4.1q-0.6-0.3-1-0.9t-0.3-1.2v-7.6q0-0.7 0.4-1.2t1-0.9l7.9-3.4v-7.3q0-0.7 0.4-1.3t1.1-0.8l8.1-3.5q0.4-0.2 0.9-0.2t0.9 0.2l8.2 3.5q0.6 0.2 1 0.8t0.4 1.3v7.3l7.9 3.4q0.7 0.3 1.1 0.9t0.4 1.2z"/></g>
  </svg>
);

const GithubIcon = props => (
  <svg viewBox="0 0 40 40" {...props}>
    <g><path d="m20.1 2.9q4.7 0 8.6 2.3t6.3 6.2 2.3 8.6q0 5.6-3.3 10.1t-8.4 6.2q-0.6 0.1-0.9-0.2t-0.3-0.7q0 0 0-1.7t0-3q0-2.1-1.2-3.1 1.3-0.2 2.3-0.4t2.1-0.9 1.8-1.5 1.2-2.3 0.5-3.4q0-2.7-1.8-4.6 0.8-2-0.2-4.5-0.6-0.2-1.8 0.2t-2 1l-0.9 0.5q-2-0.6-4.3-0.6t-4.2 0.6q-0.4-0.2-1-0.6t-1.9-0.8-1.9-0.3q-1 2.5-0.1 4.5-1.8 1.9-1.8 4.6 0 1.9 0.5 3.4t1.1 2.3 1.8 1.5 2.1 0.9 2.3 0.4q-0.9 0.8-1.1 2.3-0.4 0.2-1 0.3t-1.3 0.1-1.4-0.5-1.3-1.4q-0.4-0.7-1-1.1t-1.1-0.6l-0.5 0q-0.5 0-0.6 0.1t-0.1 0.2 0.2 0.3 0.2 0.3l0.2 0.1q0.5 0.2 1 0.9t0.7 1.1l0.2 0.5q0.3 0.9 1 1.4t1.5 0.7 1.5 0.1 1.3-0.1l0.5 0q0 0.8 0 1.9t0 1.2q0 0.5-0.3 0.7t-0.9 0.2q-5.2-1.7-8.4-6.2t-3.3-10.1q0-4.7 2.3-8.6t6.2-6.2 8.6-2.3z m-10.6 24.6q0.1-0.2-0.2-0.3-0.2-0.1-0.2 0.1-0.1 0.1 0.1 0.2 0.2 0.2 0.3 0z m0.7 0.7q0.1-0.1-0.1-0.3-0.2-0.2-0.3-0.1-0.2 0.1 0 0.4 0.3 0.2 0.4 0z m0.7 1q0.2-0.1 0-0.4-0.2-0.3-0.4-0.1-0.2 0.1 0 0.4t0.4 0.1z m0.9 1q0.2-0.2-0.1-0.4-0.3-0.3-0.4-0.1-0.2 0.2 0 0.4 0.3 0.3 0.5 0.1z m1.3 0.5q0-0.2-0.3-0.3-0.4-0.1-0.4 0.1t0.2 0.4q0.4 0.1 0.5-0.2z m1.4 0.1q0-0.2-0.4-0.2-0.4 0-0.4 0.2 0 0.3 0.4 0.3 0.4 0 0.4-0.3z m1.3-0.2q-0.1-0.2-0.4-0.2-0.4 0.1-0.3 0.4t0.4 0.1 0.3-0.3z"/></g>
  </svg>
);

const maxStiffness = 300;
const maxResistanceCoefficenet = 1;
const maxDamping = 50;
const maxSafeMargin = 200;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createRandomItems = (no) => {
  const items = [];
  for (var i = 1; i <= no; i++) {
    items.push(<span>{Math.round(Math.random()) === 0 ? <GithubIcon /> : <CubesIcon />}Item {i}</span>)
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
          createMarginWidth={60}
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

  changeItems = () => {
    this.setState({
      items: createRandomItems(10),
    })
  }

  changeActiveItem3 = () => {
    this.setState({
      activeItemIndex: 3
    })
  }

  renderDynamicTools() {
    const style = { margin: 12 };
    return (
      <div>
        <RaisedButton onClick={this.changeItems} label="Change items" style={style} />
        <RaisedButton onClick={this.changeActiveItem3} label="Change active to the fourth item" style={style} />
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