// @ts-ignore
import {PageContainer} from '@ant-design/pro-components';
import {useModel} from '@umijs/max';
import {Badge, Card, Descriptions, Form, List, message, theme, Input, Button, Space, Progress} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  getInterfaceInfoByIdUsingGET, invokeInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET
} from "@/services/geapi-backend/interfaceInfoController";
import {useParams} from "react-router";

/**
 * 接口文档
 * @returns
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.InterfaceInfo>();
  const params = useParams();
  const [invokeRes, setInvokeRes] = useState<any>();
  const [invokeLoading, setInvokeLoading] = useState(false);

  const onFinish = async (values: any) => {
    if (!params.id) {
      message.error("接口不存在");
      return;
    }
    setInvokeLoading(true);
    try {
      const res = await invokeInterfaceInfoUsingPOST({
        id: params.id,
        ...values
      })
      message.success("请求成功");
      setInvokeRes(res.data)
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
    setInvokeLoading(false);
    return false;
  };
  const loadData = async () => {
    //获取url中id的值
    if (!params.id) {
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id: Number(params.id)
      });
      //将返回值data存入Data中
      setData(res.data);
    } catch (error: any) {
      message.error('请求失败' + error.message);
    }
    setLoading(false);
  }
  useEffect(() => {
    loadData();
  }, [])

  return (
    <PageContainer title="查看接口文档">
      <Card>
        {data ? (
          <Descriptions title={data.name} column={1}>
            {/*//todo 封装后端参数转递剩余调用次数*/}
            <Descriptions.Item label="已经调用次数">{data.totalNum ? data.totalNum : 0}</Descriptions.Item>
            <Descriptions.Item label="剩余调用次数">
              <Space wrap>
                <Progress type="circle" percent={data.leftNum} format={(percent) => `${percent} 次`} />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="接口状态" span={3}>
              <Badge status="processing" text={data.status ? '开启' : '关闭'}/>
            </Descriptions.Item>
            <Descriptions.Item label="描述">{data.description}</Descriptions.Item>
            <Descriptions.Item label="请求方法">{data.method}</Descriptions.Item>
            <Descriptions.Item label="请求参数">{data.requestParams}</Descriptions.Item>
            <Descriptions.Item label="请求头">{data.requestHeader}</Descriptions.Item>
            <Descriptions.Item label="响应头">{data.responseHeader}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{data.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{data.updateTime}</Descriptions.Item>
          </Descriptions>
        ) : (
          <>接口不存在</>
        )}
      </Card>
      <Card>
        <Form
          name="invoke"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="请求参数"
            name="userRequestParams"
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item wrapperCol={{span: 16}}>
            <Button type="primary" htmlType="submit">
              调用
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Input.TextArea
          autoSize
          value={invokeRes}>
        </Input.TextArea>
      </Card>
    </PageContainer>
  );
}


export default Index;
