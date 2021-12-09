import {useParams} from "react-router-dom";
import Modal from "../modal/Modal";
import {useEffect, useState} from "react";
import axios from "axios";
import FurnitureMaterials from "./FurnitureMaterials";
import {useKeycloak} from "@react-keycloak/web";
import {storage} from "../firebase/Firebase";
import {ref, uploadBytes} from "firebase/storage"

const FurnitureEditor = () => {
    let {furnitureType, id} = useParams();
    let emptyFurniture = {
        id: 0,
        title: "",
        price: 0,
        imgUrl: "",
        maxWeight: 0,
        width: 0,
        height: 0,
        depth: 0,
        additionalInformation: "",
        stock: 0,
        glbFile: "",
        imagesUrl: "",
        color: "",
        material: "",
        furnitureType: furnitureType
    }
    let [furniture, setFurniture] = useState(emptyFurniture);
    let [glbFile, setGlbFile] = useState("");
    let [materials, setMaterials] = useState([])
    let [isLoading, setIsLoading] = useState(true);
    let {keycloak} = useKeycloak();

    useEffect(() => {
        axios.get(`http://localhost:8080/${furnitureType}/${id}`).then(response => {
            setFurniture(response.data)
        }).catch(error => setFurniture(emptyFurniture))
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

    let maxWeightFormInput = null
    if (furnitureType === "chairs") {
        maxWeightFormInput = (
            <div className="form-group">
                <label>Max weight</label>
                <input className="form-control" placeholder={"Max weight"} type="number" value={furniture.maxWeight}
                       onChange={(e) => setFurniture({...furniture, maxWeight: e.target.value})}/>
            </div>
        )
    }

    const handleOnClick = async () => {
        let furnitureId = 0;
        await axios.put("http://localhost:8080/furniture/edit", furniture, {headers: {'Authorization': `Bearer ${keycloak.token}`}})
            .then(r => {
                console.log("Furniture edited successfuly")
                furnitureId = r.data.furnitureId
                // window.location = `/furniture/${furnitureType}`
            })
            .catch(err => console.log("Can not edit furniture", err))

        if (glbFile) {
            const storageRef = ref(storage, `${furnitureId}.glb`);
            await uploadBytes(storageRef, glbFile).then(r => console.log("Uploaded file to firebase"))
                .catch(err => console.log("Error uploading file to firebase"));
        }
        window.location = `/furniture/${furnitureType}`
    }

    const handleDeleteOnClick = async () => {
        await axios.delete(`http://localhost:8080/furniture/${furnitureType}/delete/${id}`)
            .then(res => console.log("Successfully removed"))
            .catch(err => console.log("Error removing"))
        window.location = `/furniture/${furnitureType}`
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
                {maxWeightFormInput}
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
                    <label>Glb file</label>
                    <input className="form-control" placeholder={"Glb file"} type="file"
                           onChange={(e) => setGlbFile(e.target.files[0])}/>
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
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "1em"}}>
                    <button className="btn btn-danger" type="button" onClick={() => handleDeleteOnClick()}>Delete
                    </button>
                    <button className="btn btn-warning" type="button" onClick={() => handleOnClick()}>Save</button>
                </div>
            </form>
        </Modal>
    )
}

export default FurnitureEditor;