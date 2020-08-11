import React, { useState } from 'react';
import { createFromIconfontCN, LoadingOutlined } from '@ant-design/icons';
import { Input, Spin, message, Alert } from 'antd';
import style from './index.less';

const { Search } = Input;
const MyIcon: React.SFC<any> = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1323950_dmr9xa2cqsn.js',
});

interface PageState {
  url?: string,
  loading: boolean
}

const page: React.FC<{}> = () => {

  const [pageState, setPageState] = useState<PageState>({
    url: '',
    loading: false
  });

  return (
    <>
      <div className={style.head}>
        <div className={style.content}>
          <MyIcon type="icontuzix" style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => window.location.href = "https://www.twoyecloud.com"} />
          <div className={style.title}>
            <img src={require('../imgs/txtx.png')} style={{ width: "90px" }} />
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Search
          style={{ width: "90%", marginTop: "100px" }}
          size="large"
          placeholder='复制剧集链接至此'
          onSearch={value => setPageState({ url: value, loading: true })}
        />
      </div>

      {
        pageState.url && (
          <div className={style.video_area}>
            <Alert message="解析视频带广告影响观看，请使用浏览器自带全屏功能。" type="info" showIcon closable style={{ marginBottom: "10px" }} />
            <Spin spinning={pageState.loading} tip="载入中，请稍候 ..." indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
              <iframe
                className={style.ifas}
                src={`https://www.1717yun.com/jx/ty.php?url=${pageState.url}`}
                width="100%"
                height={640}
                scrolling="no"
                frameBorder="0"
                onLoad={() => {
                  setPageState({ ...pageState, loading: false });
                  message.success("视频已加载");
                }}
              />
            </Spin>
          </div>
        )
      }
      <p className={style.footer}>© {(new Date()).getFullYear()} <a href='http://www.sanqii.cn' target='_blank'>三七网</a></p>
    </>
  )
}

export default page;

