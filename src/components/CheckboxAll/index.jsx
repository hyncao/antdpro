import React, { Component } from 'react';
import { Checkbox, Form } from 'antd';

const { Item } = Form;

class CheckboxAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indeterminate: false,
      checkAll: false,
    }
    this.onCheckAllChange = this.onCheckAllChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    const { initialValue } = this.props;
    this.onChange(initialValue);
  }

  onCheckAllChange(e) {
    const { options, name, form: { setFieldsValue } } = this.props;
    const { checked } = e.target;
    setFieldsValue({
      [name]: checked ? options.map(i => i.value) : [],
    })
    this.setState({
      indeterminate: false,
      checkAll: checked,
    });
  }

  onChange(checkedList) {
    const { options, name, form: { setFieldsValue } } = this.props;
    setFieldsValue({
      [name]: checkedList,
    })
    this.setState({
      indeterminate: !!checkedList.length && checkedList.length < options.length,
      checkAll: checkedList.length === options.length,
    });
  }

  render() {
    const { indeterminate, checkAll } = this.state;
    const {
      form: { getFieldDecorator }, name, options, className, label, extra, initialValue, required,
    } = this.props;
    return (
      <div className={className}>
        <Item label={label} extra={extra}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={this.onCheckAllChange}
            checked={checkAll}
          >全选</Checkbox>
          {getFieldDecorator(name, {
            initialValue,
            rules: required && [
              { required: true, message: `请勾选${label}` },
            ],
          })(
            <Checkbox.Group
              options={options}
              onChange={this.onChange}
            />,
          )}
        </Item>
      </div>
    )
  }
}

export default CheckboxAll;
