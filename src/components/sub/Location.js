import React, { useRef, useEffect, useState } from 'react';

function Location() {
	const frame = useRef(null);
	const container = useRef(null);
	//전역등록되어 있는 kakao객체를 읽지 못하는 문제 해결
	//비구조할당으로 kakao객체값을 변수로 따로 뽑아냄
	const { kakao } = window;

	useEffect(() => {
		frame.current.classList.add('on');

		//지도 출력을 위한 옵션값 지정
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 위도,경도
			level: 3, //지도의 확대레벨
		};

		//kakao api로 부터 인스턴스 복사 (지도가 출력될 프레임, 옵션)
		new kakao.maps.Map(container.current, options);
	}, []);

	return (
		<section className='location' ref={frame}>
			<div className='inner'>
				<h1>Location</h1>

				<div id='map' ref={container}></div>
			</div>
		</section>
	);
}

export default Location;