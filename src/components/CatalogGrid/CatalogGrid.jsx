import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import "./CatalogGrid.scss";
import Spinner from "../../utils/Spinner/Spinner";
import { filterHandler } from "../../utils/helpers/filterHandler";
import CatalogCard from "../CatalogCard/CatalogCard";
import CatalogPagination from "../CatalogPagination/CatalogPagination";
import { getAllBooks, modifyCollection } from "../../slices/books";
import itemsByPage from "utils/helpers/itemsByPage";


const CatalogGrid = () => {
    const { collection, mutableCollection, isLoaded, error } = useSelector(({ books }) => books);
    const [queryParams] = useSearchParams();
    const page = queryParams.get('page') || 1;

    const dispatch = useDispatch();

    const collectionModifier = (collection) => {
        let modifiedCollection = [...collection];

        if (queryParams.get('filter')) {
            modifiedCollection = collection.filter((book) => filterHandler(book, queryParams.get('filter')));
        }

        return modifiedCollection;
    };

    useEffect(() => {
        dispatch(
            // @ts-ignore
            getAllBooks()
        );
    }, []);

    useEffect(() => {
        dispatch(
            modifyCollection(collectionModifier(collection))
        );

    }, [queryParams, collection]);

    return (
        <div className="catalog-grid-wrapper">

            {!isLoaded && (
                <div className="generic-centering-wrapper">
                    <Spinner />
                </div>
            )}

            {error && (
                <div className="generic-centering-wrapper">
                    <h2>Error: {error}</h2>
                </div>
            )}

            {!error && isLoaded && (
                <>
                    <div className="pagination-ribbon">
                        <CatalogPagination collectionLength={mutableCollection.length} />
                    </div>
                    <div className="catalog-grid">
                        {itemsByPage(mutableCollection, page).map(({ id, title, author, imageLink }) => (
                            <CatalogCard
                                key={id}
                                id={id}
                                title={title}
                                author={author}
                                imgSrc={imageLink} />
                        ))}
                    </div>
                    <div className="pagination-ribbon">
                        <CatalogPagination collectionLength={mutableCollection.length} />
                    </div>
                </>
            )}

        </div>
    );
};

export default CatalogGrid;