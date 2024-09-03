import { Dropdown, Menu, Tag } from 'antd';

const statusMenu = (
  <Menu>
    <Menu.Item key="completed">
      <Tag color="#87d068">Completed</Tag>
    </Menu.Item>
    <Menu.Item key="incompleted">
      <Tag color="#f50">Incompleted</Tag>
    </Menu.Item>
  </Menu>
);

const StatusDropdown = ({ item, onStatusChange }) => (
  <Dropdown overlay={statusMenu} trigger={['click']} onSelect={onStatusChange}>
    <div className="w-8 h-8 cursor-pointer flex items-center justify-center text-white">
      <Tag color={item.orderStatus === false ? "#f50" : "#87d068"}>
        {item.orderStatus === false ? "Incompleted" : "Completed"}
      </Tag>
    </div>
  </Dropdown>
);

export default StatusDropdown;
