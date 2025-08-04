import { DataComponent } from "../components/CourseDetails/DataComponent";
import { data } from "../utils/data";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";
import { Footer } from "../components/Footer/Footer";

export const Syllabus=()=>(
    <>
        <Header/>
        <NavBar/>
        <DataComponent title="Syllabus" data={data} mode="syllabus" />
        <Footer/>
    </>
);
