import { Breadcrumb } from "react-bootstrap"
import { getBreadcrumbItems } from "../../utils/resourcesHelpers"

const ResourceBreadcrumb = ({ currentView, selectedDept, selectedCourse, selectedSubject, selectedResource }) => {
  const breadcrumbItems = getBreadcrumbItems(
    currentView,
    selectedDept,
    selectedCourse,
    selectedSubject,
    selectedResource,
  )

  return (
    <div className="res-breadcrumb">
      <Breadcrumb>
        {breadcrumbItems.map((item, index) => (
          <Breadcrumb.Item key={index} href={item.href} active={item.active}>
            {item.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  )
}

export default ResourceBreadcrumb
