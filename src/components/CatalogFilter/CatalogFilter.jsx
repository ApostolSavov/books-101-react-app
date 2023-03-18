import './CatalogFilter.scss';
import { useDebounce } from '../../utils/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const CatalogFilter = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const currentFilter = queryParams.get('filter');

    const [currentValue, setCurrentValue] = useState(currentFilter || '');
    const debouncedFilterValue = useDebounce(currentValue, 750);

    useEffect(() => {
        setCurrentValue(currentFilter || '');

    }, [currentFilter]);

    useEffect(() => {
        if (debouncedFilterValue && debouncedFilterValue !== currentFilter) {
            setQueryParams({ filter: debouncedFilterValue });

        } else if (!debouncedFilterValue && currentFilter !== null) {
            queryParams.delete('filter');
            setQueryParams({});
        }

    }, [debouncedFilterValue]);

    return (
        <div className='catalog-filter-wrapper'>
            <label className='catalog-filter-label' htmlFor="filter">Filter</label>
            <input onChange={(e) => setCurrentValue(e.target.value)} value={currentValue} id="filter" name="filter" className='catalog-filter-input' type="search" placeholder="Enter filter word..." />
        </div>
    );
};

export default CatalogFilter;