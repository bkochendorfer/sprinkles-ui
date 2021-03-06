import color from 'color';
import React from 'react';
import reactCSS from 'reactcss';
import stylePropType from 'react-style-proptype';
import Base from './Base';

export default class Button extends Base {
  displayName = 'Button';

  static propTypes = {
    children: React.PropTypes.node,
    enabled: React.PropTypes.bool,
    groupPosition: React.PropTypes.oneOf(['left', 'center', 'right']),
    onClick: React.PropTypes.func,
    text: React.PropTypes.string,
    type: React.PropTypes.oneOf([
      'secondary',
      'primary',
      'success',
      'info',
      'warning',
      'danger',
    ]),
    working: React.PropTypes.bool,
    style: stylePropType,
  };

  static defaultProps = {
    enabled: true,
    working: false,
    text: 'Submit',
    type: 'secondary',
  };

  displayName = 'Button';

  constructor() {
    super();
    this.state = {
      isHovering: false,
    };
  }

  componentWillMount() {
    this.keyframe = document.createElement('style');
    this.keyframe.innerHTML = `@keyframes button-working {
      from { background-position: 0 0; }
      to { background-position: 14px 0px; }
    }`;
    document.head.appendChild(this.keyframe);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.working !== nextProps.working && nextProps.working) {
      this.setState({ isHovering: false });
    }
  }

  componentWillUnmount() {
    document.head.removeChild(this.keyframe);
  }

  handleMouseOut() {
    this.setState({ isHovering: false });
  }

  handleMouseOver() {
    this.setState({ isHovering: true });
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
    return this.props.text;
  }

  render() {
    const clr = this.getColors();
    const veryDarkened = color(clr.buttonColors[this.props.type])
        .darken(0.3).hexString();
    const darkened = color(clr.buttonColors[this.props.type])
        .darken(0.1).hexString();
    const lightened = color(clr.buttonColors[this.props.type])
        .lighten(0.3).hexString();
    const workingColor = this.props.type === 'secondary' ? darkened : veryDarkened;
    const style = reactCSS({
      default: {
        Button: {
          background: clr.buttonColors.secondary,
          borderTop: `1px solid ${veryDarkened}`,
          borderLeft: `1px solid ${veryDarkened}`,
          borderBottom: `1px solid ${veryDarkened}`,
          borderRight: `1px solid ${veryDarkened}`,
          borderRadius: '3px',
          color: clr.textColors.primary,
          padding: '5px 15px',
          outline: 'none',
        },
      },
      typeColor: {
        Button: {
          background: clr.buttonColors[this.props.type],
          borderTop: `1px solid ${clr.buttonColors[this.props.type]}`,
          borderLeft: `1px solid ${clr.buttonColors[this.props.type]}`,
          borderBottom: `1px solid ${veryDarkened}`,
          borderRight: `1px solid ${clr.buttonColors[this.props.type]}`,
          color: clr.textColors.light,
        },
      },
      hovering: {
        Button: {
          background: darkened,
          cursor: 'pointer',
        },
      },
      disabled: {
        Button: {
          background: this.props.type === 'secondary' ? darkened : lightened,
          cursor: 'not-allowed',
        },
      },
      working: {
        Button: {
          cursor: 'wait',
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 7px,
            ${workingColor} 7px,
            ${workingColor} 14px
          )`,
          animation: 'button-working 0.5s linear infinite',
          backgroundSize: '14px auto',
        },
      },
      groupPositionLeft: {
        Button: {
          borderRadius: '3px 0 0 3px',
          borderRight: `1px solid ${veryDarkened}`,
        },
      },
      groupPositionCenter: {
        Button: {
          borderLeft: 0,
          borderRight: `1px solid ${veryDarkened}`,
          borderRadius: 0,
        },
      },
      groupPositionRight: {
        Button: {
          borderLeft: 0,
          borderRadius: '0 3px 3px 0',
        },
      },
    }, {
      typeColor: this.props.type !== 'secondary',
      hovering: this.state.isHovering && !this.props.working,
      disabled: !this.props.enabled,
      working: this.props.working,
      groupPositionLeft: this.props.groupPosition === 'left',
      groupPositionCenter: this.props.groupPosition === 'center',
      groupPositionRight: this.props.groupPosition === 'right',
    });
    const buttonStyle = Object.assign({}, style.Button, this.props.style);
    return (
      <button
        disabled={this.props.working || !this.props.enabled}
        onClick={this.props.onClick}
        onMouseOut={this.handleMouseOut.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        style={buttonStyle}
      >
        {this.renderChildren()}
      </button>
    );
  }
}
