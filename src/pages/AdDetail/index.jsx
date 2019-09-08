import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Card, Input, Select, Radio, Upload, Icon, Button,
} from 'antd';
import { BlankLine, AuthWrap, ModalChooseCustomer } from '@/components/index.jsx';
import styles from './index.less';

const { Item } = Form;
const { Option } = Select;

@connect(({ adDetail }) => ({ adDetail }))
@Form.create()
class AdDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseCustom: {},
      videoRadio: 'new',
      uploadDisabled: false,
      fileList: [],
    }
    this.chooseCustomer = this.chooseCustomer.bind(this);
    this.submit = this.submit.bind(this);
    this.submitAudit = this.submitAudit.bind(this);
    this.chooseBack = this.chooseBack.bind(this);
    this.handleVideoRadio = this.handleVideoRadio.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  chooseCustomer() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/getList',
    })
  }

  submit() {
    const { dispatch, form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const res = await dispatch({
          type: 'adDetail/save',
          payload: values,
        })
        console.log(res);
      }
    })
  }

  submitAudit() {
    const { dispatch, form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        const res = await dispatch({
          type: 'adDetail/save',
          payload: values,
        })
        console.log(res);
      }
    })
  }

  chooseBack(chooseCustom) {
    const { form: { setFieldsValue } } = this.props;
    setFieldsValue({ customer: chooseCustom.name })
    this.setState({ chooseCustom })
  }

  handleVideoRadio(e) {
    const { value: videoRadio } = e.target;
    this.setState({ videoRadio });
  }

  beforeUpload({ size, type }) {
    console.log(size);
    console.log(type);
  }

  handleUpload(data) {
    const { file } = data;
    const { status } = file;
    if (status === 'uploading') {
      this.setState({ uploadDisabled: true });
    } else {
      if (status === 'done') {
        const { form: { setFieldsValue } } = this.props;
        setFieldsValue({ file: file.response.url });
      }
      this.setState({ uploadDisabled: false });
    }
    const fileList = [file];
    this.setState({ fileList });
  }

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const btnBoxLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 4,
        },
      },
    }
    const {
      chooseCustom, videoRadio, uploadDisabled, fileList,
    } = this.state;
    const { form: { getFieldDecorator }, adDetail: { loading }, history } = this.props;
    return (
      <div>
        <ModalChooseCustomer handleChoose={this.chooseBack} chooseId={chooseCustom.id} />
        <BlankLine />
        <Form {...formItemLayout}>
          <Card title="基础信息" bordered={false}>
            <Item label="广告名称" extra="一般为上刊日期+标识名称组成，如0720兰博基尼">
              {getFieldDecorator('adTitle', {
                initialValue: '',
                rules: [
                  { required: true, message: '请填写广告名称' },
                ],
              })(
                <Input placeholder="请填写广告名称" maxLength={32} />,
              )}
            </Item>
            <Item label="行业属性">
              {getFieldDecorator('attribute', {
                initialValue: '',
                rules: [
                  { required: true, message: '请选择行业属性' },
                ],
              })(
                <Select placeholder="请选择">
                  <Option value="1">房地产</Option>
                  <Option value="2">教育培训</Option>
                  <Option value="3">生活服务</Option>
                </Select>,
              )}
            </Item>
            <AuthWrap authLimit="admin">
              <Item label="所属客户">
                {getFieldDecorator('customer', {
                  initialValue: '',
                  rules: [
                    { required: true, message: '请选择所属客户' },
                  ],
                })(
                  <Input placeholder="请选择所属客户" readOnly onClick={this.chooseCustomer} />,
                )}
              </Item>
            </AuthWrap>
          </Card>
          <Card title="视频信息" bordered={false}>
            <Item>
              <Radio.Group onChange={this.handleVideoRadio} value={videoRadio}>
                <Radio.Button value="new">新视频上传</Radio.Button>
                <Radio.Button value="choose">从视频列表选择</Radio.Button>
              </Radio.Group>
            </Item>
            <Item label="选择文件">
              {getFieldDecorator('file', {
                initialValue: '',
                rules: [
                  { required: true, message: '请选择上传文件' },
                ],
              })(
                <Upload
                  action="/ad/upload"
                  beforeUpload={this.beforeUpload}
                  fileList={fileList}
                  disabled={uploadDisabled}
                  onChange={this.handleUpload}
                >
                  <Button>
                    <Icon type="upload" /> 选择文件
                  </Button>
                </Upload>,
              )}
            </Item>
            {fileList.length > 0 && <p>文件大小：{(fileList[0].size / 1024 / 1024).toFixed(2)}M</p>}
          </Card>
          <Card bordered={false}>
            <Item {...btnBoxLayout}>
              <Button className={styles.btn} type="primary" htmlType="submit" onClick={this.submit}>提交</Button>
              <Button className={styles.btn} type="primary" onClick={this.submitAudit}>提交并审核</Button>
              <Button className={styles.btn} type="primary" onClick={history.goBack}>取消</Button>
            </Item>
          </Card>
        </Form>
      </div>
    )
  }
}

export default AdDetail;
