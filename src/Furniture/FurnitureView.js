import Header from "../Header/Header";
import Card from "../HomePage/Card/Card";
import {Route, Routes} from "react-router-dom";
import FurnitureListView from "./FurnitureListView";

let furnitureCards = <div>
    <div className="d-flex justify-content-center container full-page-height-without-header
                full-page-height-without-header flex-column d-sm-flex flex-sm-row">
        <Card imageName={"./office-chair.svg"} alt={"chairs"} link={"/furniture/chairs"}
              cardColor={"bg-primary"} cardTitle={"Chairs"}/>
        <Card imageName={"./furniture-locker.svg"} alt={"wardrobes"} link={"/furniture/wardrobes"}
              cardColor={"bg-secondary"} cardTitle={"Wardrobes"}/>
    </div>
</div>

const FurnitureView = () => {
    return (
        <div>
            <Header/>
            <Routes>
                <Route path={"/"} element={furnitureCards}/>
                <Route path={"/:furnitureType/*"} element={<FurnitureListView/>}/>
            </Routes>
        </div>
    )
}

export default FurnitureView;