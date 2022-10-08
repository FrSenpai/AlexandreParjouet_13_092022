import { Img } from "../../models/Features";
import "./FeatureItem.css";
import PropTypes from 'prop-types'; 
export function FeatureItem({ img, title, text }: { img: Img, title: string, text: string }) {
    return (
        <div className="feature-item">
            <img src={img.src} alt={img.alt} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{text}</p>
        </div>
    )
}

FeatureItem.propsType = {
    img: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}