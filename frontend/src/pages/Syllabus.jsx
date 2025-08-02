import { DataComponent } from "../components/DataComponent";
import { data } from "../utils/data";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";

export const Syllabus=()=>(
    <>
        <Header/>
        <NavBar/>
        <DataComponent title="Syllabus" data={data} mode="syllabus" />

    </>
);
