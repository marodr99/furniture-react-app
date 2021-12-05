import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import FurnitureCard from "./FurnitureCard";
import PageSwitcher from "../pageSwitcher/PageSwitcher";

const FurnitureListView = () => {
    let {furnitureType} = useParams();
    let [furniture, setFurniture] = useState([])
    let [page, setPage] = useState(1);
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8080/furniture/' + furnitureType + "/" + (page - 1))
            .then(response => setFurniture(response.data))
            .catch(error => console.log("Can not fetch furniture..."))
            .finally(setIsLoading(false))
    }, [furnitureType, page])
    console.log(furniture)
    let furnitureList = null
    if (furniture.furnitureFromPage)
        furnitureList = furniture.furnitureFromPage.map(f => <FurnitureCard key={f.id} furniture={f}/>)
    return (
        isLoading ? null : <div>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {furnitureList}
            </div>
            <PageSwitcher totalNumberOfPages={furniture.totalNumberOfPages} setPage={setPage} page={page}/>
        </div>
    )
}

export default FurnitureListView;