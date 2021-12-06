import {useParams} from "react-router-dom";
import Modal from "../modal/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import FurnitureMaterials from "./FurnitureMaterials";
import {useKeycloak} from "@react-keycloak/web";

const FurnitureEditor = () => {
    let {furnitureType, id} = useParams();
    let [furniture, setFurniture] = useState({});
    let [materials, setMaterials] = useState([])
    let [isLoading, setIsLoading] = useState(true);
    let {keycloak} = useKeycloak();

    useEffect(() => {
        axios.get(`http://localhost:8080/${furnitureType}/${id}`).then(response => {
            setFurniture(response.data)
        }).catch(error => console.log("Can not get single furniture"))
        axios.get(`http://localhost:8080/${furnitureType}/search/options`).then(response => {
            setMaterials(response.data.material)
        }).catch(error => console.log("Can not get furniture materials")).finally(setIsLoading(false))
    }, [furnitureType, id])

    const getProperMaterialName = () => {
        if (furniture) {
            if (furnitureType === "chairs")
                return "chairMaterial"
            else if (furnitureType === "wardrobes")
                return "wardrobeMaterial"
        }
    }

    const handleOnClick = () => {
        console.log(furniture)
        console.log(keycloak.token)
        axios.put("http://localhost:8080/furniture/edit", furniture, {headers: {'Authorization': `Bearer ${keycloak.token}`}})
            .then(r => {
                console.log("Furniture edited successfuly")
                window.location = `/furniture/${furnitureType}`
            })
            .catch(err => console.log("Can not edit furniture", err))
    }

    return (
        isLoading ? null : <Modal>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" placeholder={"Title"} type="text" value={furniture.title}
                           onChange={(e) => setFurniture({...furniture, title: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input className="form-control" placeholder={"Price"} type="number" value={furniture.price}
                           onChange={(e) => setFurniture({...furniture, price: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Main photo url</label>
                    <input className="form-control" placeholder={"Main photo url"} type="text" value={furniture.imgUrl}
                           onChange={(e) => setFurniture({...furniture, imgUrl: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Width</label>
                    <input className="form-control" placeholder={"Width"} type="number" value={furniture.width}
                           onChange={(e) => setFurniture({...furniture, width: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Height</label>
                    <input className="form-control" placeholder={"Height"} type="number" value={furniture.height}
                           onChange={(e) => setFurniture({...furniture, height: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Depth</label>
                    <input className="form-control" placeholder={"Depth"} type="number" value={furniture.depth}
                           onChange={(e) => setFurniture({...furniture, depth: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Additional Information</label>
                    <textarea className="form-control" placeholder="Additional Information"
                              value={furniture.additionalInformation}
                              onChange={(e) => setFurniture({...furniture, additionalInformation: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Stock</label>
                    <input className="form-control" placeholder={"Stock"} type="number" value={furniture.stock}
                           onChange={(e) => setFurniture({...furniture, stock: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Glb file name</label>
                    <input className="form-control" placeholder={"Glb file name"} type="text" value={furniture.fileName}
                           onChange={(e) => setFurniture({...furniture, fileName: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Images url</label>
                    <textarea className="form-control" placeholder={"Images url"} value={furniture.imagesUrl}
                              onChange={(e) => setFurniture({...furniture, imagesUrl: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Color</label>
                    <input className="form-control" placeholder={"Color"} type="text" value={furniture.color}
                           onChange={(e) => setFurniture({...furniture, color: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Materials</label>
                    <select className="form-select" value={furniture[getProperMaterialName()]}
                            onChange={(e) => setFurniture({...furniture, [getProperMaterialName()]: e.target.value})}>
                        <FurnitureMaterials materials={materials}/>
                    </select>
                </div>
                <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
                    <button className="btn btn-warning" type="button" onClick={() => handleOnClick()}>Save</button>
                </div>
            </form>
        </Modal>
    )
}

export default FurnitureEditor;