import { useState } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import { FaBell } from "react-icons/fa";

export const NotificationBell = ({ notifications }) => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown align="end" show={show} onToggle={() => setShow(!show)}>
      <Dropdown.Toggle variant="link" className="text-warning position-relative">
        <FaBell size={22} />
        {notifications?.length > 0 && (
          <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
            {notifications.length}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-end shadow">
        {notifications?.length > 0 ? (
          notifications.map((n, i) => (
            <Dropdown.Item key={i}>{n.message}</Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item className="text-muted">No notifications</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};
