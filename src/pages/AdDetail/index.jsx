import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Card, Input, Select, Radio, Upload, Icon, Button, Alert, Spin,
} from 'antd';
import {
  BlankLine, AuthWrap, ModalChooseCustomer, CheckboxAll, CheckboxIpt,
} from '@/components/index.jsx';
import { getUrlQuery } from '@/utils/utils';
import styles from './index.less';

const { Item } = Form;
const { Option } = Select;

@connect(({ adDetail }) => ({ adDetail }))
@Form.create()
class AdDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertMessage: null,
      chooseCustom: {},
      videoRadio: 'new',
      uploadDisabled: false,
      fileList: [],
      detail: {},
    }

    this.getDetail = this.getDetail.bind(this);
    this.chooseCustomer = this.chooseCustomer.bind(this);
    this.submit = this.submit.bind(this);
    this.submitAudit = this.submitAudit.bind(this);
    this.chooseBack = this.chooseBack.bind(this);
    this.handleVideoRadio = this.handleVideoRadio.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.preview = this.preview.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  componentDidMount() {
    const { form: { resetFields } } = this.props;
    if (getUrlQuery('id')) {
      this.getDetail(getUrlQuery('id'));
    } else {
      resetFields();
    }
  }

  async getDetail(id) {
    const { dispatch } = this.props;
    const res = await dispatch({
      type: 'adDetail/getDetail',
      payload: { id },
    });
    const { data, data: { file, chooseCustom } } = res;
    if (file.id) {
      this.setState({
        detail: {
          ...data,
          chooseFile: file.id,
          customer: chooseCustom.name,
          wideChannel: data.wideChannel.split(','),
          blockChannel: data.blockChannel.split(','),
        },
        videoRadio: 'choose',
        chooseCustom,
      })
    }
  }

  chooseCustomer() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customer/getList',
    })
  }

  submit(e) {
    e.preventDefault();
    const { dispatch, form: { validateFields } } = this.props;
    validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const res = await dispatch({
          type: 'adDetail/saveDetail',
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
          type: 'adDetail/saveDetail',
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

  preview() {
    const { videoRadio, uploadDisabled, fileList } = this.state;
    const { form: { getFieldValue }, history } = this.props;
    let alertMessage;
    if (videoRadio === 'new') {
      if (uploadDisabled) {
        alertMessage = '视频正在上传';
      }
      if (fileList.length === 0) {
        alertMessage = '请先上传视频';
      }
    }
    if (!getFieldValue('chooseFile')) {
      alertMessage = '请选择视频';
    }
    if (alertMessage) {
      this.setState({ alertMessage });
      return;
    }
    history.push('/ad/preview');
  }

  closeAlert() {
    this.setState({ alertMessage: null });
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
      chooseCustom, videoRadio, uploadDisabled, fileList, alertMessage, detail,
    } = this.state;
    const {
      form, history,
      form: { getFieldDecorator, getFieldValue },
      adDetail: { adDetailLoading, submitLoading },
    } = this.props;

    if (adDetailLoading) {
      return <Spin className={styles.spin} tip="加载中……" />
    }

    return (
      <div>
        <BlankLine />
        {alertMessage && <Alert type="error" message={alertMessage} onClose={this.closeAlert} closable />}
        <BlankLine />
        <ModalChooseCustomer handleChoose={this.chooseBack} chooseId={chooseCustom.id} />
        <Form {...formItemLayout}>

          <Card title="基础信息" bordered={false}>
            <Item label="广告名称" extra="一般为上刊日期+标识名称组成，如0720兰博基尼">
              {getFieldDecorator('adTitle', {
                initialValue: detail.adTitle,
                rules: [
                  { required: true, message: '请填写广告名称' },
                ],
              })(
                <Input placeholder="请填写广告名称" maxLength={32} />,
              )}
            </Item>
            <Item label="行业属性">
              {getFieldDecorator('attribute', {
                initialValue: detail.attribute,
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
                  initialValue: detail.customer,
                  rules: [
                    { required: true, message: '请选择所属客户' },
                  ],
                })(
                  <Input placeholder="请选择所属客户" readOnly onClick={this.chooseCustomer} />,
                )}
              </Item>
            </AuthWrap>
          </Card>

          <BlankLine />

          <Card title="视频信息" bordered={false}>
            <Item>
              <Radio.Group onChange={this.handleVideoRadio} value={videoRadio}>
                <Radio.Button value="new">新视频上传</Radio.Button>
                <Radio.Button value="choose" disabled={uploadDisabled}>从视频列表选择</Radio.Button>
              </Radio.Group>
            </Item>
            {videoRadio === 'new'
              ? (
                <>
                  <Item label="选择文件">
                    {getFieldDecorator('fileChoose', {
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
                  {fileList.length > 0
                    && <p>文件大小：{(fileList[0].size / 1024 / 1024).toFixed(2)}M</p>
                  }
                </>
              )
              : (
                <Item label="视频选择">
                  {getFieldDecorator('chooseFile', {
                    initialValue: detail.chooseFile,
                    rules: [
                      { required: true, message: '请选择视频' },
                    ],
                  })(
                    <Select placeholder="请选择">
                      <Option value="1">视频1</Option>
                      <Option value="2">视频2</Option>
                      <Option value="3">视频3</Option>
                    </Select>,
                  )}
                </Item>
              )
            }
            <Item>
              <Button disabled={uploadDisabled} type="primary" onClick={this.preview}>视频预览</Button>
            </Item>
          </Card>

          {getFieldValue('chooseFile')
            && (
              <>
                <BlankLine />
                <Card title="转码信息" bordered={false}>
                  <Item label="转码名称" extra="不支持中文，支持输入数字英文下划线,如0720Lamborghini">
                    {getFieldDecorator('zTitle', {
                      initialValue: detail.zTitle,
                      rules: [
                        { required: true, message: '请填写转码名称' },
                        { pattern: /^[0-9a-zA-Z_]*$/, message: '请输入数字英文下划线' },
                      ],
                    })(
                      <Input placeholder="请填写转码名称" maxLength={32} />,
                    )}
                  </Item>
                  <CheckboxAll
                    name="wideChannel"
                    form={form}
                    label="宽幅通道"
                    initialValue={detail.wideChannel}
                    options={[
                      { label: 'S_JPEG2K(进口宽银幕)', value: 'S_JPEG2K' },
                      { label: 'S_3D(3D宽银幕)', value: 'S_3D' },
                      { label: 'S_MPEG2(国产宽银幕)', value: 'S_MPEG2' },
                    ]}
                  />
                  <CheckboxAll
                    name="blockChannel"
                    form={form}
                    label="遮幅通道"
                    initialValue={detail.blockChannel}
                    options={[
                      { label: 'F_JPEG2K（进口遮福）', value: 'F_JPEG2K' },
                      { label: 'F_3D(3D遮幅)', value: 'F_3D' },
                      { label: 'F_MPEG2(国产遮幅)', value: 'F_MPEG2' },
                    ]}
                  />
                  <CheckboxIpt
                    name="cutHead"
                    form={form}
                    label="开头裁剪"
                    initialValue={detail.cutHead}
                    pattern={/^[1-9]\d*$/}
                    message="开头裁剪格式有误"
                  />
                  <CheckboxIpt
                    name="cutEnd"
                    form={form}
                    label="结尾裁剪"
                    initialValue={detail.cutEnd}
                    pattern={/^[1-9]\d*$/}
                    message="结尾裁剪格式有误"
                  />
                </Card>
              </>
            )
          }

          <Card bordered={false}>
            <Item {...btnBoxLayout}>
              <Button className={styles.btn} type="primary" disabled={uploadDisabled || submitLoading} htmlType="submit" onClick={this.submit}>提交</Button>
              <Button className={styles.btn} type="primary" disabled={uploadDisabled || submitLoading} onClick={this.submitAudit}>提交并审核</Button>
              <Button className={styles.btn} type="primary" onClick={history.goBack}>取消</Button>
            </Item>
          </Card>
        </Form>
      </div>
    )
  }
}

export default AdDetail;
