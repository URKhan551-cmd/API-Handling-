const SearchBar = ({value, onChange}) => {

    return (
        <input 
        id="searchBar"
        type="text" 
        value={value} 
        onChange={onChange} 
        
        placeholder="CityName..." />
    )
}

export default SearchBar
