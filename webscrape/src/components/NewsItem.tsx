function NewsItem(props: any){
    const item = props.item;
  return (
    <div className="border rounded-full m-1">
        <div className="bg-white p-4 rounded shadow text-center scrollbar-hide">
          <div className="grid grid-flow-col">
            <a href={item.url} rel="noopener noreferrer" className="text-xl font-semibold hover:underline">
            {item.headline}
            </a>
          </div>
          <div className="grid grid-flow-col grid-rows">
            <div className="text-blue-950">
              {item.pubDate}
            </div>
            <div className="text-cyan-800">
              {item.author}
            </div>
          </div>
        </div>
    </div>
  );
};

export default NewsItem;


