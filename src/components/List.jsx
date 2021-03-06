import React from 'react';
import reactCSS from 'reactcss';
import { Map } from 'immutable';
import Base from './Base';

export default class List extends Base {
  static propTypes = {
    children: React.PropTypes.node,
    showBorder: React.PropTypes.bool,
  };

  static defaultProps = {
    showBorder: true,
  };

  displayName = 'List';

  renderChildren() {
    this.listItemRefs = new Map();
    return React.Children.map(this.props.children, (child, i) => {
      if (child) {
        const lenChildren = this.props.children.length;
        let listPosition;
        if (lenChildren > 0) {
          switch (i) {
            case 0:
              listPosition = 'first';
              break;
            case lenChildren - 1:
              listPosition = 'last';
              break;
            default:
              listPosition = 'middle';
              break;
          }
        }
        return React.cloneElement(child, {
          listPosition,
          ref: c => {
            this.listItemRefs = this.listItemRefs.set(i, c);
          },
        });
      }
      return null;
    });
  }

  render() {
    const style = reactCSS({
      border: {
        List: {
          border: `1px solid ${this.getColors().structuralColors.divider}`,
        },
      },
    }, {
      border: this.props.showBorder,
    });
    return (
      <div
        ref={c => this.listWrapperRef = c}
        style={style.List}
      >
        {this.renderChildren()}
      </div>
    );
  }
}
