import { GiphyFetch } from '@giphy/js-fetch-api';
import {
  Grid,
  SearchBar,
  SearchContext,
  SearchContextManager,
  SuggestionBar,
} from '@giphy/react-components';
import { useContext, useState } from 'react';
import "./Giphy.css";
import CloseIcon from '@mui/icons-material/Close';


const gf = new GiphyFetch('AhnqYZcZo2ydVYmHV4cjjAl58XFhhaMa');

const Components = ({ addGif, setShowGifs }) => {
  const { searchKey } = useContext(SearchContext);
  const [term, setTerm] = useState('');

  const fetchLimitedGifs = () => gf.search(searchKey || term, { limit: 6, offset: 0 });

  const handleGifClick = (gif) => {
    console.log("GIF seleccionado:", gif);
    const gifUrl = gif.images.original.url;
    addGif(gifUrl);
  };

  return (
    <>
      <div className='giphy-container'>
        <div className="close-container">
          <CloseIcon className="close-icon" onClick={() => setShowGifs(false)} />
        </div>
        <SearchBar onSearch={(value) => setTerm(value)} />
        <SuggestionBar
          height={300}
        />
        <Grid
          noResultsMessage="No GIFs found"
          hideAttribution={true}
          key={searchKey}
          columns={3}
          width={400}
          fetchGifs={fetchLimitedGifs}
          onGifClick={(gif, e) => { e.preventDefault(); handleGifClick(gif); }}
        />
      </div>

    </>
  );
};

function SearchExperience({ addGif, setShowGifs }) {
  return (
    <SearchContextManager apiKey="AhnqYZcZo2ydVYmHV4cjjAl58XFhhaMa">
      <Components addGif={addGif} setShowGifs={setShowGifs} />
    </SearchContextManager>
  );
}

export default SearchExperience;
