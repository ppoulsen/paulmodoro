// @flow
import React from 'react';
import type { Children } from 'react';

export default (props: { children: Children }) => (
  <div>
    {props.children}
  </div>
);
