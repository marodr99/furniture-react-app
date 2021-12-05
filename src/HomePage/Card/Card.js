import './Card.css'
import {Link} from "react-router-dom";

const Card = ({imageName, alt, cardTitle, cardColor, link, isLinkToExternalSite}) => {
    let containerClasses = `card m-3 my-card ${cardColor}`
    let aHref = <a className="my-card-link" href={link}>
        <img className="card-img-top p-2" src={imageName} alt={alt} style={{width: "8rem", height: "8rem"}}/>
        <div className="card-body text-center">
            <h5 className="card-title">{cardTitle}</h5>
        </div>
    </a>
    let reactRouterLink = <Link className="my-card-link" to={link}>
        <img className="card-img-top p-2" src={imageName} alt={alt} style={{width: "8rem", height: "8rem"}}/>
        <div className="card-body text-center">
            <h5 className="card-title">{cardTitle}</h5>
        </div>
    </Link>
    return (
        <div className={containerClasses}>
            {isLinkToExternalSite ? aHref : reactRouterLink}
        </div>
    )
}

export default Card;