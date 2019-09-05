import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import {
  Form, DatePicker, Button, Table,
} from 'antd';
import { BlankLine, SearchBox } from '@/components/index.jsx';
import styles from './index.less';

@connect(({ adDetail }) => ({ adDetail }))
@Form.create()
class AdDetail extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      1
    )
  }
}

export default AdDetail;
