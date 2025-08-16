import { Spinner } from "react-bootstrap"

const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="text-center py-5">
    <Spinner animation="border" variant="primary" />
    <p className="mt-2 text-muted">{text}</p>
  </div>
)

export default LoadingSpinner
