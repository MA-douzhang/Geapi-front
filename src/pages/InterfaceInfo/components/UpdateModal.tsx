import {
  ProColumns, ProFormInstance,
  ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import {Modal} from 'antd';
import React, {useEffect, useRef} from 'react';

export type Props = {
  values: API.InterfaceInfo;
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (value: API.InterfaceInfo) => Promise<void>;
  visible: boolean;
}
const UpdateModal: React.FC<Props> = (props) => {
  const {values,visible, columns, onCancel, onSubmit} = props;

  const formRef = useRef<ProFormInstance>();
  console.log(values)
  useEffect(()=>{
    if (formRef){
      formRef.current?.setFieldsValue(values);
    }
  },[values])

  return <Modal visible={visible} footer={null} onCancel={() => onCancel?.()}>
    <ProTable
      type="form"
      formRef={formRef}
      columns={columns}
      onSubmit={ async (value) => {
        //更新表单时带上表单id
        value.id = values.id;
        onSubmit?.(value);
    }}
    />
  </Modal>
};
export default UpdateModal;
