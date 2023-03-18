import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import "./CatalogGrid.scss";
import Spinner from "../../utils/Spinner/Spinner";
import { filterHandler } from "../../utils/helpers/filterHandler";
import { sortHandler } from "../../utils/helpers/sortHandler";
import CatalogCard from "../CatalogCard/CatalogCard";
import CatalogPagination from "../CatalogPagination/CatalogPagination";
import { getAllBooks, cancelLoading, modifyCollection } from "../../slices/books";

const CatalogGrid = () => {
    const { collection, mutableCollection, isLoaded, error } = useSelector(({ books }) => books);
    const [queryParams] = useSearchParams();
    const page = queryParams.get('page') || 1;

    const controller = new AbortController();
    const dispatch = useDispatch();

    const booksByPage = (collection, page, limit = 20) => {
        return collection.slice((page - 1) * limit, page * limit + 1);
    };

    const collectionModifier = (collection) => {
        let modifiedCollection = [...collection];

        if (queryParams.get('filter')) {
            modifiedCollection = collection.filter((book) => filterHandler(book, queryParams.get('filter')));
        }
        if (queryParams.get('sort')) {
            //todo
            modifiedCollection.sort(sortHandler);
        }

        return modifiedCollection;
    };

    useEffect(() => {
        dispatch(
            getAllBooks(controller)
        );

        return () => {
            dispatch(cancelLoading());
            controller.abort();
        };
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
                    <div className="catalog-grid">
                        {booksByPage(mutableCollection, page).map(({ id, title, author, imageLink }) => (
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