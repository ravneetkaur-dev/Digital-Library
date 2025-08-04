import { DataComponent } from "../components/CourseDetails/DataComponent";
import { data } from "../utils/data";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { Container, Row, Col } from "react-bootstrap";
import './paper.css'

export const Paper=()=>(
    <>
        <Header/>
        <NavBar/>
        <Container fluid className="m-0 p-0">
            <Row>
                <DataComponent title="Previous Year Papers" data={data} mode="papers" />
            </Row>
            
        </Container>
        
    </>
    
);
