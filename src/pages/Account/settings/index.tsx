import {PageContainer, ProForm, ProFormInstance, ProFormMoney, ProFormText, ProTable} from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Card, List, message, theme} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {listInterfaceInfoByPageUsingGET} from "@/services/geapi-backend/interfaceInfoController";
import {getLoginUserUsingGET} from "@/services/geapi-backend/userController";

/**
 * 主页
 * @returns
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<API.UserVO>(0);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const formRef = useRef<API.UserVO>();

  const loadData = async () =>{
    setLoading(true)
    try {
      const res = await getLoginUserUsingGET();
      if (res){
        console.log(res)
        setData(res.data)
        message.success('请求成功');
      }
    }catch (error:any){
      message.error('请求失败' + error.message);
    }
    setLoading(false);
  }
  useEffect(() =>{
    loadData();
  },[])
  return (
    <PageContainer>
    </PageContainer>
  );
}


export default Index;
