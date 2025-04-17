import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './components/SearchInput';
import { Button } from '@mui/material';
import { Request } from '../../api/request';
import { useContext, useState } from 'react';
import { FiltersContext } from '../../state/filters';

const Searchbar = () => {
    const [searchText, setSearchText] = useState<string>("");
    const { state } = useContext(FiltersContext)

    const search = async () => {
        console.log({state});
        
        const result = await Request.getInstance().search(
            1,
            10,
            {
                ...state,
                name: searchText
            }
        ).then(({ data }) => {
            console.log('Search result:', data);
        }).catch(err => {
            console.error('Search error:', err);
        }
        );

    }

    return (
        <div className="flex items-center justify-center w-full p-4 ">
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Search>
            <Button
                variant="contained"
                color="primary"
                className="ml-4"
                onClick={search}
            >
                Search
            </Button>
        </div>
    );
}

export default Searchbar;