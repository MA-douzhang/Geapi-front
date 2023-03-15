import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {Card, List, message, theme} from 'antd';
import React, {useEffect, useState} from 'react';
import {listInterfaceInfoByPageUsingGET} from "@/services/geapi-backend/interfaceInfoController";

/**
 * 主页
 * @returns
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number>(0);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);

  const loadData = async (current =1,pageSize=5) =>{
    setLoading(true)
    try {
      const res = await listInterfaceInfoByPageUsingGET({
        current,pageSize
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
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
      <List
        className="my-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return(
            <List.Item
              actions={[<a key={item.id} href={apiLink}>查看</a>]}
            >
              <List.Item.Meta
                title={<a href={apiLink}>{item.name}</a>}
                description={item.description}/>
            </List.Item>
            );
        }}
        pagination={{
          showTotal(total){
            return '总数' + total;
          },
          pageSize: 5,
          total,
          onChange(page,pageSize){
            loadData(page,pageSize);
          }
        }}
      />
    </PageContainer>
  );
}


export default Index;
