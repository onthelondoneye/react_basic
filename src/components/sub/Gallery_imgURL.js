import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';

function Gallery() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	const [imgURL, setImgURL] = useState('');

	const api_key = 'ec5df49dc610d7a3248cbddd8e157cd9'; //개인 키값!!
	const method = 'flickr.interestingness.getList';
	const per_page = 3;
	const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;

	useEffect(() => {
		frame.current.classList.add('on');

		axios
			.get(url)
			.then((json) => {
				console.log(json.data.photos.photo);
				setItems(json.data.photos.photo);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<section className='gallery' ref={frame}>
				<div className='inner'>
					<h1>Gallery</h1>
					<ul>
						{items.map((item, idx) => {
							return (
								<li 
									key={idx}
									onClick={e => {

										setIsPop(!isPop);
										setImgURL(e.currentTarget.querySelector('img').getAttribute('data-url'));
									}}
								>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										data-url={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`}
									/>
									<h2>{item.title}</h2>
								</li>
							);
						})}
					</ul>
				</div>
			</section>

			{/* isPop이 true일때 팝업출력 */}
			{isPop ? <Popup /> : null}
		</>
	);

	function Popup() {
		return (
			<aside className='popup'>
				<div className="pic">
					<img src={imgURL} alt="" />
				</div>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		);
	}
}

export default Gallery;