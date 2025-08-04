import { DataComponent } from "../components/CourseDetails/DataComponent";
import { data } from "../utils/data";
import { Header } from "../components/Header/Header";
import { NavBar } from "../components/NavBar/NavBar";

export const Econtent=()=>(
        <>
            <Header/>
            <NavBar/>
            <DataComponent title="E-Books & Study Material" data={data} mode="books" />

        </>
);
