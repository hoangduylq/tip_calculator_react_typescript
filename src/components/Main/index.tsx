import React from 'react';
import Logo from './icons/logo.svg';
import CalInput from '../CalInput';
import CalResult from '../CalResult';
import './styles/main.scss';

const Main = () => {
  return (
    <div>
      <article className='main grid wide'>
      <section className='logo-wrap'>
        <img src={Logo} alt='' />
      </section>
      <section className='calculator'>
        <CalInput />
        <CalResult />
      </section>
    </article>
    </div>
  )
}

export default Main;