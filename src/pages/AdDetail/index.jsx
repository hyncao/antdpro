import React, { Component } from 'react';
import { connect } from 'dva';
import {
  Form, Card, Input, Select, Radio, Upload, Icon, Button, Alert, Spin, notification,
} from 'antd';
import {
  BlankLine, AuthWrap, ModalChooseCustomer, CheckboxAll, CheckboxIpt,
} from '@/components/index.jsx';
import { getUrlQuery } from '@/utils/utils';
import { cashReg } from '@/utils/reg';
import styles from './index.less';

const { Item } = Form;
const { Option } = Select;

@connect(({ user, adDetail }) => ({ user, adDetail }))
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
    this.getVideoList = this.getVideoList.bind(this);
    this.chooseCustomer = this.chooseCustomer.bind(this);
    this.submit = this.submit.bind(this);
    this.submitAudit = this.submitAudit.bind(this);
    this.chooseBack = this.chooseBack.bind(this);
    this.getVideoList = this.getVideoList.bind(this);
    this.handleVideoRadio = this.handleVideoRadio.bind(this);
    this.beforeUpload = this.beforeUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.preview = this.preview.bind(this);
    this.checkVideoList = this.checkVideoList.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.checkCustomer = this.checkCustomer.bind(this);
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
          mediaFileId: file.id,
          customer: chooseCustom.name,
          wideChannel: data.wideChannel.split(','),
          blockChannel: data.blockChannel.split(','),
        },
        videoRadio: 'choose',
        chooseCustom,
      })
    }
  }

  getVideoList(customerId) {
    const { dispatch } = this.props;
    dispatch({
      type: 'adDetail/getVideoList',
      payload: { customerId },
    })
  }

  chooseCustomer() {
    const { dispatch, user: { currentUser: { userId } } } = this.props;
    dispatch({
      type: 'customer/getList',
      payload: { userId },
    })
  }

  submit(e) {
    e.preventDefault();
    const { dispatch, form: { validateFields, getFieldValue } } = this.props;
    console.log(getFieldValue('mediaFileUpload'))
    validateFields(async (err, values) => {
      if (!err) {
        const { user: { currentUser: { userId } } } = this.props;
        const data = {
          ...values,
          userId,
        }
        console.log(data);
        const res = await dispatch({
          type: 'adDetail/saveDetail',
          payload: data,
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
    setFieldsValue({
      customer: chooseCustom.customerFullName,
      customerId: chooseCustom.id,
    })
    this.getVideoList(chooseCustom.id);
    this.setState({ chooseCustom })
    this.getVideoList(chooseCustom.id);
  }

  handleVideoRadio(e) {
    const { value: videoRadio } = e.target;
    this.setState({ videoRadio }, this.checkCustomer);
  }

  beforeUpload({ size, name }) {
    const arr = ['avi', 'mp4', 'mov', 'mpg', 'mpeg', 'm2ts', 'wmv', 'mkv'];
    const type = name.split('.')[name.split('.').length - 1];
    console.log(size);
    console.log(name);
    if (!arr.includes(type)) {
      notification.error({
        message: '请上传avi,mp4,mov,mpg,mpeg,m2ts,wmv,mkv格式的文件',
      });
      return false;
    }
    return true;
  }

  handleUpload(data) {
    const { file } = data;
    const { status } = file;
    const { form: { setFieldsValue } } = this.props;
    let fileList = [file];
    if (status === 'uploading') {
      this.setState({ uploadDisabled: true });
    } else {
      if (status === 'done') {
        const { response } = file;
        if (response.code === 200) {
          setFieldsValue({ mediaFileId: response.data.id });
        } else {
          fileList = [];
          setTimeout(() => {
            setFieldsValue({ mediaFileUpload: '' })
          }, 0);
          setFieldsValue({ mediaFileId: '' });
          notification.error({
            message: response.msg,
          });
        }
      }
      this.setState({ uploadDisabled: false });
    }
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
    if (!getFieldValue('mediaFileId')) {
      alertMessage = '请选择视频';
    }
    if (alertMessage) {
      this.setState({ alertMessage });
      return;
    }
    history.push('/ad/preview');
  }

  checkVideoList() {
    const { chooseCustom, videoRadio } = this.state;
    if (videoRadio === 'choose') {
      if (!chooseCustom.id) {
        notification.error({
          message: '请选择所属客户',
          description: '视频选择需要根据所属客户来确定',
        });
      }
    }
  }

  closeAlert() {
    this.setState({ alertMessage: null });
  }

  checkCustomer() {
    const { chooseCustom, videoRadio } = this.state;
    if (videoRadio === 'choose' && !chooseCustom.id) {
      notification.error({
        message: '请先选择所属客户',
        description: '',
      });
    }
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
      adDetail: { adDetailLoading, submitLoading, videoList },
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
              {getFieldDecorator('mediaName', {
                initialValue: detail.mediaName,
                rules: [
                  { required: true, message: '请填写广告名称' },
                ],
              })(
                <Input placeholder="请填写广告名称" maxLength={32} />,
              )}
            </Item>
            <Item label="行业属性">
              {getFieldDecorator('mediaSecondType', {
                initialValue: detail.mediaSecondType,
                rules: [
                  { required: true, message: '请选择行业属性' },
                ],
              })(
                <Select placeholder="请选择">
                  <Option value="公益">公益</Option>
                  <Option value="商业">商业</Option>
                  <Option value="生活服务">生活服务</Option>
                </Select>,
              )}
            </Item>
            <AuthWrap authLimit="admin">
              <Item style={{ display: 'none' }}>
                {getFieldDecorator('customerId', {})(
                  <Input type="hidden" />,
                )}
              </Item>
              <Item label="所属客户">
                {getFieldDecorator('customerId', {
                  initialValue: detail.customerId,
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
                  {getFieldDecorator('mediaFileId', {
                    initialValue: detail.mediaFileId,
                  })(<Input type="hidden" />)}
                  <Item label="选择文件">
                    {getFieldDecorator('mediaFileUpload', {
                      initialValue: '',
                      rules: [
                        { required: true, message: '请选择上传文件' },
                      ],
                    })(
                      <Upload
                        action="/api/ad/upload"
                        beforeUpload={this.beforeUpload}
                        fileList={fileList}
                        disabled={uploadDisabled}
                        onChange={this.handleUpload}
                        accept=".avi,.mp4,.mov,.mpg,.mpeg,.m2ts,.wmv,.mkv"
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
                <div onClick={this.checkCustomer}>
                  <Item label="视频选择">
                    {getFieldDecorator('mediaFileId', {
                      initialValue: detail.mediaFileId,
                      rules: [
                        { required: true, message: '请选择视频' },
                      ],
                    })(
                      <Select placeholder="请选择">
                        {videoList.length > 1 && videoList.map(i => (
                          <Option key={i.id} value={i.id}>{i.originalName}</Option>
                        ))}
                      </Select>,
                    )}
                  </Item>
                </div>
              )
            }
            <Item>
              <Button disabled={uploadDisabled} type="primary" onClick={this.preview}>视频预览</Button>
            </Item>
          </Card>

          {getFieldValue('mediaFileId')
            && (
              <>
                <BlankLine />
                <Card title="转码信息" bordered={false}>
                  <Item label="转码名称" extra="不支持中文，支持输入数字英文下划线,如0720Lamborghini">
                    {getFieldDecorator('transcoding', {
                      initialValue: detail.transcoding,
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
                      { label: 'S_JPEG2K(进口宽银幕)', value: 1 },
                      { label: 'S_3D(3D宽银幕)', value: 2 },
                      { label: 'S_MPEG2(国产宽银幕)', value: 3 },
                    ]}
                  />
                  <CheckboxAll
                    name="blindChannel"
                    form={form}
                    label="遮幅通道"
                    initialValue={detail.blockChannel}
                    options={[
                      { label: 'F_JPEG2K(进口遮福)', value: 1 },
                      { label: 'F_3D(3D遮幅)', value: 2 },
                      { label: 'F_MPEG2(国产遮幅)', value: 3 },
                    ]}
                  />
                  <CheckboxIpt
                    name="cutStart"
                    form={form}
                    label="开头裁剪(秒)"
                    initialValue={detail.cutStart}
                    pattern={cashReg}
                    message="开头裁剪格式有误"
                  />
                  <CheckboxIpt
                    name="cutEnd"
                    form={form}
                    label="结尾裁剪(秒)"
                    initialValue={detail.cutEnd}
                    pattern={cashReg}
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
