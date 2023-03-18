import { useSearchParams } from 'react-router-dom';
import { Fragment } from 'react';

import './CatalogPagination.scss';

const CatalogPagination = ({ collectionLength }) => {
    const [queryParams, setQueryParams] = useSearchParams();
    const currentPage = Number(queryParams.get('page')) || 1;

    const pages = [...Array(Math.ceil(collectionLength / 20)).keys()];

    const divider = () => <hr className='pagination-page-button-divider' />;
    const navButton = (btnContent, targetPage) => {
        return (
            <div className='pagination-page-button icon' onClick={(e) => clickHandler(targetPage)}>{btnContent}</div>
        );
    };

    const clickHandler = (page) => {
        setQueryParams({ ...Object.fromEntries([...queryParams]), page });
    };

    return (
        <>
            {currentPage !== 1 && (
                <>
                    {navButton('<', currentPage - 1)}
                    {divider()}
                </>
            )}

            {pages.map((n) => {

                const pageNum = n + 1;

                return (
                    <Fragment key={pageNum}>
                        <div className={`pagination-page-button${currentPage == pageNum ? ' active' : ''}`} onClick={(e) => clickHandler(pageNum)} >
                            {pageNum}
                        </div>
                        {divider()}
                    </Fragment>
                );
            })}

            {currentPage !== pages.length && (
                <>
                    {navButton('>', currentPage + 1)}
                </>
            )}
        </>
    );
};

export default CatalogPagination;