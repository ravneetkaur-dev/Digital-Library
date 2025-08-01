import { Button } from 'react-bootstrap';

export const NotificationsPanel = ({ notification }) => {
  const handleAccept = () => {
    alert(`Accepted: ${notification.message}`);
  };

  const handleReject = () => {
    alert(`Rejected: ${notification.message}`);
  };

  return (
    <div>
      <p>{notification.message}</p>
      <div className="d-flex justify-content-end">
        <Button size="sm" variant="success" onClick={handleAccept} className="me-2">
          Accept
        </Button>
        <Button size="sm" variant="danger" onClick={handleReject}>
          Reject
        </Button>
      </div>
    </div>
  );
};

