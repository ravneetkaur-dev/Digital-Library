import { DataComponent } from "../components/DataComponent";
import { data } from "../utils/data";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";

export const Econtent=()=>(
        <>
            <Header/>
            <NavBar/>
            <DataComponent title="E-Books & Study Material" data={data} mode="books" />

        </>
);
