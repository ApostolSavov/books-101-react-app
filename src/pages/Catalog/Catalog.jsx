import "./Catalog.scss";
import CatalogGrid from "../../components/CatalogGrid/CatalogGrid";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";

const Catalog = () => {
    return (
        <div className="catalog-page">
            <div className="catalog-options-ribbon">
                <CatalogFilter />
            </div>
            <CatalogGrid />
        </div>
    );
};

export default Catalog;