import React from 'react';
import { Link } from 'react-router-dom';
import './component.scss';
const signIn = () => {

  const handleSubmit = () => {
    alert('로그인');
  }
  return (
    <div className='login'>
      <div className='box'>
        <p>환영합니다</p>
        <p>시스템 사용을 위해 로그인 해주세요.</p>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button type='submit'>Sign In</button>
          <p><Link to={'/sign-up'}>Sign Up</Link> for free</p>
        </form>
        <p>or</p>
        <button className='Google'>Google</button>
        <button className='Kakao'>Kakao</button>
        <button className='Naver'>Naver</button>
      </div>
    </div>
  );
};

export default signIn;