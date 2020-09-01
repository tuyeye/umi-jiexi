import React, { FC, useEffect, useState } from 'react';
import style from '@/pages/index.less';
import { connect } from 'dva';
import { createFromIconfontCN, LoadingOutlined } from '@ant-design/icons';
import { Input, Spin, message, Alert, Divider, Modal, Form } from 'antd';

const { Search, TextArea } = Input;

const namespace = 'index';

const MyIcon: React.SFC<any> = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1323950_dmr9xa2cqsn.js',
});


const theNav: FC<any> = ({ dispatch }) => {

    useEffect(() => {
        dispatch({
            type: `${namespace}/up`,
            payload: {
                page: window.location.href
            }
        })
    }, [])

    return (
        <div className={style.head}>
            <div className={style.content}>
                <MyIcon type="icontuzix" style={{ fontSize: "30px", cursor: "pointer" }} />
                <div className={style.title}>
                    <img src={require('@/imgs/txtx.png')} style={{ width: "90px" }} />
                </div>
            </div>
        </div>
    )
}

const theVideo: FC<any> = ({ index: { url, loading, searchPage}, dispatch }) => {

    const loaded = async () => {
        await dispatch({ type: `${namespace}/loaded` });
        message.success("视频已加载");
    }

    const changeLine = async () => {
        await dispatch({
            type: `${namespace}/fetch`,
            payload: {
                originPage: window.location.href,
                searchPage,
                line:"12"
            }
        })
    }

    return (
        <div className={style.video_area}>
            {url && (<Alert message={<span>手机端访问解析视频带广告影响观看，请使用浏览器自带全屏功能，推荐使用 UC浏览器。不是你想要的结果？ <a style={{ color: '#ec5658' }} onClick={changeLine}>切换源试试看！</a></span>} type="info" showIcon closable style={{ marginBottom: "10px" }} />)}

            {url && (
                <Spin spinning={loading} tip="载入中，请稍候 ..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    <iframe
                        className={style.ifas}
                        src={url}
                        width="100%"
                        height={640}
                        scrolling="no"
                        frameBorder="0"
                        onLoad={loaded}

                    />
                </Spin>
            )}
        </div>
    )
}

const theSearch: FC<any> = ({ dispatch }) => {

    const search = (value: string) => {
        if (value) {
            dispatch({
                type: `${namespace}/fetch`,
                payload: {
                    originPage: window.location.href,
                    searchPage: value,
                    line:"11"
                }
            })
        }
    }



    return (
        <div style={{ textAlign: "center" }}>
            <Search
                style={{ width: "90%", marginTop: "100px" }}
                size="large"
                placeholder='复制剧集链接至此'
                onSearch={search}

            />
        </div>
    )
}

const theFooter: FC<any> = ({ dispatch }) => {

    const [form] = Form.useForm();
    const [state, setState] = useState({
        visible: false,
        content: ""
    })

    const submit = async () => {
        form
            .validateFields()
            .then(async (values) => {
                form.resetFields();
                await dispatch({ type: `${namespace}/sendMails`, payload: values });
                setState({
                    ...state,
                    visible: false
                });
                message.success("感谢您的反馈～");
            })
    }

    return (
        <>
            <div className={style.footer}>
                © {(new Date()).getFullYear()} <a href='http://www.sanqii.cn' target='_blank'>三七网</a>
                <Divider type="vertical" />
                <a onClick={() => setState({ ...state, visible: true })} style={{ color: '#ec5658' }}>反馈问题</a>
                <Divider type="vertical" />
                <a href='http://blog.sanqii.cn' target='_blank'>作者博客</a>
                <Divider type="vertical" />
                <a href='http://pic.sanqii.cn' target='_blank'>4k壁纸</a>
                <Divider type="vertical" />
                <a href='http://bt.sanqii.cn' target='_blank'>种子搜索神器</a>
            </div>
            <Modal
                visible={state.visible}
                title="意见反馈"
                onOk={submit}
                onCancel={() => setState({ ...state, visible: false })}
                okText="提交问题"
                cancelText="取消"

            >
                <Alert message={<span>您也可通过 <a href="https://github.com/tuyeye/umi-jiexi/issues" target="_blank">issue</a> 提交问题～</span>} type="error" style={{ marginBottom: '10px' }} closable />
                <Form form={form}>
                    <Form.Item name="content" rules={[{ required: true, message: '请描述您的问题' }]} >
                        <TextArea
                            placeholder="为了提供更优质服务，请告诉我，您遇到了什么问题？"
                            allowClear
                            autoSize={{ minRows: 4 }}
                        />
                    </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

const Video = connect(({ index }: any) => ({ index }))(theVideo);
const Nav = connect(({ index }: any) => ({ index }))(theNav);
const SearchArea = connect(({ index }: any) => ({ index }))(theSearch);
const Footer = connect(({ index }: any) => ({ index }))(theFooter);

export { Nav, Video, SearchArea, Footer };