import { useState } from 'react';
import axios from 'axios';
import NewsItem from './components/NewsItem';

const App = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const fetchNews = async () => {
      setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/scrape', {params: {url: input}});
      setNews(response.data.news);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      alert('Error fetching news.');
    } 
      setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-2">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-950">News Scraper</h1>
      <div className="flex justify-center mb-4 text-black">
        <input
          type="text"
          placeholder="Enter news section URL"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-2/3 p-2 rounded border"
        />
        <button
          onClick={fetchNews}
          className='bg-green border-none outline-none text-black ml-2'
        >
          {loading ? 'Loading...' : 'Fetch News'}
        </button>
      </div>
      <div className="max-h-120 overflow-auto scrollbar-hide">
        {news.map((item, idx) => (
          <NewsItem key={idx} item={item} />
        ))}
      </div>
    </div>  
  );
};

export default App;
