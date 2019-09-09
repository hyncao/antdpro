import React, { Component } from 'react';
import {
  Checkbox, Input, Form, Row, Col,
} from 'antd';
import styles from './index.less';

const { Item } = Form;

class CheckboxIpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: props.initialValue,
    }
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(e) {
    const { checked } = e.target;
    this.setState({ checked });
  }

  render() {
    const { checked } = this.state;
    const {
      form: { getFieldDecorator }, name, className, label, extra, initialValue, pattern, message,
    } = this.props;
    return (
      <div className={className}>
        <Item label={label} extra={extra}>
          <Row gutter={10}>
            <Col span={2}>
              <Checkbox
                onChange={this.handleCheckbox}
                checked={checked}
              />
            </Col>
            <Col span={16}>
              {getFieldDecorator(name, {
                initialValue,
                rules: pattern ? [{ pattern, message }] : null,
              })(
                <Input placeholder={`请填写${label}`} maxLength={32} disabled={!checked} />,
              )}
            </Col>
          </Row>
        </Item>
      </div>
    )
  }
}

export default CheckboxIpt;
