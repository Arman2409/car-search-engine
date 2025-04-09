import SearchIcon from '@mui/icons-material/Search';

import { Search, SearchIconWrapper, StyledInputBase } from './components/SearchInput';
import { Button } from '@mui/material';

const Searchbar = () => {
    return (
        <div className="flex items-center justify-center w-full p-4 ">
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Button
                variant="contained"
                color="primary"
                className="ml-4"
                onClick={() => console.log('Search button clicked')}
            >
                Search
            </Button>
        </div>
    );
}

export default Searchbar;