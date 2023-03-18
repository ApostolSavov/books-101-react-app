import "./CatalogPage.scss";
import CatalogGrid from "../../components/CatalogGrid/CatalogGrid";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import CatalogSort from "../../components/CatalogSort/CatalogSort";

const CatalogPage = () => {
    return (
        <div className="catalog-page">
            <div className="catalog-options-ribbon">
                <CatalogFilter />
                <CatalogSort />
            </div>
            <CatalogGrid />
        </div>
    );
};

export default CatalogPage;