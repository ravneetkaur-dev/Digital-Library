
import { useEffect, useState } from "react"
import { Container, Alert, Spinner } from "react-bootstrap"
import { FacultyDashboard } from "../components/faculty/FacultyDashboard"

export const FacultyDashboardPage=()=> {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuthentication()
  }, [])

  const checkAuthentication = () => {
    try {
      const facultyToken = localStorage.getItem("faculty_token")
      const facultyData = localStorage.getItem("faculty_data")

      if (facultyToken && facultyData) {
        // Verify token is not expired
        try {
          const tokenData = JSON.parse(atob(facultyToken.split(".")[1]))
          const currentTime = Date.now() / 1000

          if (tokenData.exp > currentTime) {
            setIsAuthenticated(true)
          } else {
            // Token expired
            localStorage.removeItem("faculty_token")
            localStorage.removeItem("faculty_data")
            setIsAuthenticated(false)
          }
        } catch (err) {
          console.error("Error parsing token:", err)
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Error checking authentication:", error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" size="lg" />
          <p className="mt-3">Loading dashboard...</p>
        </div>
      </Container>
    )
  }

  if (!isAuthenticated) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Alert variant="warning" className="text-center">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>You need to be logged in as a faculty member to access this dashboard.</p>
          <hr />
          <div className="d-flex justify-content-center">
            <a href="/" className="btn btn-primary">
              Go to Login
            </a>
          </div>
        </Alert>
      </Container>
    )
  }

  return <FacultyDashboard />
}
