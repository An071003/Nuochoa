import React from "react";
import { Dropdown } from "antd";
import "./Dropdown.css";

const NewDropdown = ({ menuItems, triggerElement }) => {
  return (
    <Dropdown
      menu={{
        items: menuItems,
      }}
      trigger={["hover"]}
      placement="bottomRight"
      overlayClassName="custom-dropdown"
    >
      <div className="popup">
        {triggerElement}
      </div>
    </Dropdown>
  );
};

export default NewDropdown;
