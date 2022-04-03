import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';

function Department() {
  let [index, setIndex] = useState(0);
  const frame = useRef(null);

  //추후 axios로 불러온 데이터 배열을 담을 state 생성
  const [members, setMembers] = useState([]);

  //public 폴더의 절대 경로값을 구함
  const path = process.env.PUBLIC_URL;

  //절대경로에서부터의 json 파일 데이터 url값 구함
  const url =  `${path}/DB/Department.json`;

	//컴포넌트 생성시 처음 한번만 동작
	useEffect(() => {
		// console.log('컴포넌트 생성');
		frame.current.classList.add('on');

    //axios로 위에 만든 url 데이터 요청후
    //요헝이 성공하면 state 값을 옮겨 담음
    axios
      .get(url)
      .then((json)=>{
        console.log(json.data.data);
        setMembers(json.data.data);
      })
      .catch((err)=>{
        console.log(err);
      })

		// return () => {
		// 	console.log('컴포넌트 소멸');
		// };
	}, []);

	//index를 의존성으로 등록해서 해당 state가 변경될때마다 호출
	// useEffect(() => {
	// 	console.log('index값 변경');
	// }, [index]);


  return (
    <section className='department' ref={frame}>
      <div className="inner">
        <h1>Department</h1>
        <button onClick={()=>{
          console.log(members[0].name );
          
          //배열이나 참조형 할때 꼭 복사해서 변경
          // let newMembers = (members[0].name ="Da");
          let newMembers = [...members];
						newMembers[0].name = 'Michael';
						setMembers(newMembers);
						console.log(members);
          
        }}>멤버정보 변경</button>

        
        {/* <button className="plus" onClick={()=>setIndex(++index)}>더하기</button>
        <button className="mius" onClick={()=>setIndex(--index)}>뻬기</button>
        <h3>{index}</h3> */}

        {/* state에 있는 배열값을 반복돌면서 가삼 DOM 생성 */}

        <ul>
          {
            members.map((data, idx) => {
              return (
                <li key={idx}>
                  <img src={`${path}/img/${data.pic}`} />
                  <h2>{data.name}</h2>
                  <p>{data.position}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    </section>
  )
}

export default Department;
/*
  useEffect : 해당 컴포너틑의 생성, 상태값 변경, 소멸이라는 생명주기에 따라 특정 구문을 실행할 수 있는 hook
  -- useEffect는 첫번째 인수로 콜백함수 등록
  -- useEffect는 두번째 인수로 의존성 등록 (원하는 state를 의존성으로 등록)
  -- useEffect의 두번째 인수로 빈 배열을 의존성으로 등록 : 해당 컴포넌트가 처음 생성될때 한번만 호출 가능
  -- useEffect안쪽에서 함수를 리턴하면 해당 함수는 컴포넌트가 소멸할때 호출됨
*/