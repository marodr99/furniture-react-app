import './Card.css'

const Card = ({imageName, alt, cardTitle, cardColor, link}) => {
    let containerClasses = `card m-3 my-card ${cardColor}`
    return (
        <div className={containerClasses}>
            <a className="my-card-link" href={link}>
                <img className="card-img-top p-2" src={imageName} alt={alt} style={{width: "8rem", height: "8rem"}}/>
                <div className="card-body text-center">
                    <h5 className="card-title">{cardTitle}</h5>
                </div>
            </a>
        </div>
    )
}

export default Card;