import { DataComponent } from "../components/DataComponent";
import { data } from "../utils/data";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
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
