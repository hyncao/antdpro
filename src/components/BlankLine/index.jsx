import React from 'react';
import { Row } from 'antd';

export default ({ len = 1 }) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(<Row key={i}>&emsp;</Row>);
  }
  return arr;
};
