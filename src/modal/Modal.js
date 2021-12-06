import "./modal.css"
import {useNavigate} from "react-router-dom";

const Modal = ({children}) => {
    let navigate = useNavigate();
    return (
        <div>
            <div className="modal">
                {children}
            </div>
            <div className="overlay" onClick={() => navigate(-1)}/>
        </div>
    )
}

export default Modal;