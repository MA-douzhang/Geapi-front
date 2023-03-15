import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Card, List, message, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {
  getInterfaceInfoByIdUsingGET,
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

  const loadData = async () =>{
    //获取url中id的值
    if (!params.id){
      message.error('参数不存在');
      return;
    }
    try {
      const res = await getInterfaceInfoByIdUsingGET({
        id:Number(params.id)
      });
      //将返回值data存入Data中
      setData(res.data);
    }catch (error:any){
      message.error('请求失败' + error.message);
    }
    setLoading(false);
  }
  useEffect(() =>{
    loadData();
  },[])

  return (
    <PageContainer title="查看接口文档">
      {JSON.stringify(data)}
    </PageContainer>
  );
}


export default Index;
