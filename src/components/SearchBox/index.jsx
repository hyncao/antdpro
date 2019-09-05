import React, { Component } from 'react';
import {
  Row, Col, Form, Input, Select, Button,
} from 'antd';
import BlankLine from '../BlankLine';
import AuthWrap from '../AuthWrap';
import styles from './index.less';

const { Item } = Form;
const { Option } = Select;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.tableSearch = this.tableSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  tableSearch(e) {
    e.preventDefault();
    const { handleSearch } = this.props;
    handleSearch();
  }

  handleReset() {
    const { form: { resetFields } } = this.props;
    resetFields();
  }

  render() {
    const {
      form: { getFieldDecorator }, searchLoading, searchArr, bonusBtn,
    } = this.props;
    const searchItem = searchArr && searchArr.length > 0 && searchArr.map(i => {
      let component;
      if (i.component) {
        // 自定义组件
        ({ component } = i);
      } else if (i.options) {
        // select组件
        component = (
          <Select style={{ width: 140 }} className={styles.ipt}>
            {i.options.map(item => (
              <Option key={item.value} value={item.value}>{item.text}</Option>
            ))}
          </Select>
        )
      } else {
        const placeholder = i.placeholder ? i.placeholder : `请输入${i.label}`;
        // input组件
        component = (
          <Input
            className={styles.ipt}
            placeholder={placeholder}
            maxLength={i.maxLength || 32}
          />
        )
      }
      return (
        <AuthWrap authLimit={i.authLimit} key={i.name}>
          <Col span={5}>
            <Item className={styles.searchItem} label={i.label}>
              {getFieldDecorator(i.name, { initialValue: i.initialValue })(component)}
            </Item>
          </Col>
        </AuthWrap>
      )
    });

    return (
      <Form onSubmit={this.tableSearch}>
        <BlankLine />
        <Row gutter={10}>{searchItem}</Row>
        <Row gutter={20}>
          <Col span={2}>
            <Button loading={searchLoading} htmlType="submit" type="primary">搜索</Button>
          </Col>
          <Col span={2}>
            <Button type="danger" onClick={this.handleReset}>清空</Button>
          </Col>
          {bonusBtn && bonusBtn.map(i => (
            <Col span={3} key={i.id}>{i.btn}</Col>
          ))}
        </Row>
      </Form>
    )
  }
}

export default SearchBox;
