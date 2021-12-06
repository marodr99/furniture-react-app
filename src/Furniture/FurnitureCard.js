import "../HomePage/Card/Card.css"
import {useLocation, useNavigate} from "react-router-dom";

const FurnitureCard = ({furniture}) => {
    let location = useLocation();
    let navigate = useNavigate()
    return (
        <div className="card m-3" style={{display: "inline-block", width: "12.5em", height: "14em", padding: "1em"}}
             onClick={() => navigate(`${location.pathname}/${furniture.id}`)}>
            <img className="card-img-top p-2" src={furniture.imgUrl} alt={"furniture"}
                 style={{width: "100%", height: "8rem"}}/>
            <div className="card-body text-center">
                <h5 className="card-title">{furniture.title}</h5>
            </div>
        </div>
    )
}

export default FurnitureCard;