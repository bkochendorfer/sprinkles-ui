/* eslint func-names: "off" */

import React from 'react';
import ListItemGroup from '../../src/components/ListItemGroup';
import ListItem from '../../src/components/ListItem';
import TextListItem from '../../src/components/TextListItem';

describe('ListItemGroup', function () {
  this.header(`
  ## ListItemGroup
  `);

  before(() => {
    this.component(
      <ListItemGroup label={'Group'}>
        <ListItem>
          <TextListItem
            text={'Cheese'}
          />
        </ListItem>
        <ListItem>
          <TextListItem
            text={'Crackers'}
          />
        </ListItem>
      </ListItemGroup>
    );
  });

  /**
   * Documentation (Markdown)
   */
  this.footer(`
  ### ListItemGroup

  A group of list items

  #### API

  - **children** *React.PropTypes.node* (optional) child components
  - **label** *React.PropTypes.string* (optional) text description for this group of items, defaults to 'Group'

  `);
});
