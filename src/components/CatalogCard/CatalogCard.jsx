import { Link } from "react-router-dom";
import "./CatalogCard.scss";

const CatalogCard = ({ id, title, author, imgSrc }) => {

    return (
        <div data-id={id} className="catalog-card">

            <div className="catalog-card__img-wrapper">
                <Link to={`/catalog/${id}`}>
                    <img className="catalog-card__img" src={imgSrc} alt="book-photo" />
                </Link>
            </div>

            <div className="catalog-card__text-wrapper">
                <h3 className="catalog-card__title">{title}</h3>
                <div className="catalog-card__author-wrapper">
                    <span className="catalog-card__author">Author: </span>
                    <span className="catalog-card__author-name">{author}</span>
                </div>
            </div>

        </div>
    );
};

export default CatalogCard;