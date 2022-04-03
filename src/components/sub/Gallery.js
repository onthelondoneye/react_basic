import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';

function Gallery() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	const [index, setIndex] = useState(0);

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

	// useEffect(() => {
	// 	console.log(index);
	// }, [index]);

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
									onClick={() => {
										setIsPop(!isPop);
										setIndex(idx);
									}}>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
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
		useEffect(() => {
			document.body.style.overflow = 'hidden';
			return () => (document.body.style.overflow = 'auto');
		}, []);

		return (
			<aside className='popup'>
				{/* index state값에 따라 팝업에 출력되는 내용 변경 */}
				<div className='pic'>
					<img
						src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
					/>
				</div>
				<p>{items[index].title}</p>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		);
	}
}

export default Gallery;