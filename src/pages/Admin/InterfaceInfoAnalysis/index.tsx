import {PageContainer} from '@ant-design/pro-components';
import React, {useEffect, useState} from 'react';
import ReactECharts from 'echarts-for-react';
import {
  listTopInvokeInterfaceInfoUsingGET,
  listTopUserInvokeInterfaceInfoUsingGET
} from "@/services/geapi-backend/analysisController";
import '@umijs/max';


/**
 * 主页
 * @returns
 */
const InterfaceInfoAnalysis: React.FC = () => {

  const [invokeData, setInvokeData] = useState<API.InterfaceInfoVO[]>([]);
  const [userData, setUserData] = useState<API.UserInterfaceVO[]>([]);

  useEffect(() => {
    //接口TOP5
    try {
      listTopInvokeInterfaceInfoUsingGET().then(res => {
        if (res.data) {
          setInvokeData(res.data);
        }
      })
    } catch (e: any) {

    }
    //用户活跃的TOP5
    try {
      listTopUserInvokeInterfaceInfoUsingGET().then(res => {
        if (res.data) {
          setUserData(res.data);
        }
      })
    } catch (e: any) {

    }
    // todo 从远程获取数据
  }, [])

  // 映射：{ value: 1048, name: 'Search Engine' },
  const chartData = invokeData.map(item => {
    return {
      value: item.totalNum,
      name: item.name,
    }
  })
  // 映射：{ value: 1048, name: 'Search Engine' },
  const userChartData = userData.map(item => {
    return {
      score: item.totalNum,
      name: item.userName,
    }
  })

  const invokeOption = {
    title: {
      text: '调用次数最多的接口TOP5',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const userOption = {
    title: {
      text: '最活跃的用户TOP5',
      left: 'center',
    },
    dataset: [
      {
        dimensions: ['name', 'score'],
        source: userChartData
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' }
        }
      }
    ],
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0, rotate: 30 }
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1
    }
  }
  return (
    <PageContainer>
      <ReactECharts option={invokeOption}/>
      <ReactECharts option={userOption}/>
    </PageContainer>
  );
}


export default InterfaceInfoAnalysis;
