import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';

function Youtube() {
	const frame = useRef(null);
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	const [index, setIndex] = useState(0);

	const api_key = 'AIzaSyBlqqCxbr_ZsH2FJ1DpSlh7zinBwvSUEXY';
	const play_list = 'PLi7duXYDAT177U3L_meN2z6AHQruqIQ4n';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&playlistId=${play_list}&maxResults=3&part=snippet`;

	useEffect(() => {
		frame.current.classList.add('on');

		axios.get(url).then((json) => {
			// console.log(json.data.items[0].snippet.thumbnails.default.url);
			console.log(json.data.items);
			
			setItems(json.data.items);
		});
	}, []);

	return (
		<>
			<section className='youtube' ref={frame}>
				<div className='inner'>
					<h1>Youtube</h1>
					{items.map((item, idx) => {
						let desc = item.snippet.description;
						let desc_len = desc.length;
						let date = item.snippet.publishedAt;

						return (
							<article
								key={idx}
								onClick={() => {
									setIsPop(!isPop);
									setIndex(idx);
								}}>
								<div className='inner'>
									<div className='pic'>
										<img src={item.snippet.thumbnails.medium.url} />
									</div>
									<h2>{item.snippet.title}</h2>
									<p>{desc_len > 200 ? desc.substr(0, 200) + '...' : desc}</p>
									<span>{date.split('T')[0]}</span>
								</div>
							</article>
						);
					})}
				</div>
			</section>

			{isPop ? <Popup /> : null}
		</>
	);

	function Popup() {
		useEffect(() => {
			console.log('pop');
			document.body.style.overflow = 'hidden';

			return () => {
				document.body.style.overflow = 'auto';
			};
		}, []);

		return (
			<aside className='popup'>
				<iframe src={'https://www.youtube.com/embed/'+items[index].snippet.resourceId.videoId} frameBorder="0"></iframe>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		);
	}
}

export default Youtube;