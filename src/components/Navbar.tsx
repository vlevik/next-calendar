'use client';
import React from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import { open_Sans_400 } from '../styles/fonts';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { open } from '@/redux/newEventFormSlice';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(user.events.map((event: Event) => ({ ...event, _id: undefined }))),
    )}`;
    const link = document.createElement('a');
    link.href = jsonString;
    link.download = 'data.json';

    link.click();
  };

  return (
    <nav className="navbar container" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item"></div>
        <div className="navbar-item">
          <button className={cn(open_Sans_400.className, 'button is-info')} onClick={() => dispatch(open())}>
            Add new event
          </button>
        </div>

        <div className="navbar-item">
          <button className={cn(open_Sans_400.className, 'navbar-item button is-warning')} onClick={() => exportData()}>
            Export
          </button>
        </div>

        <div className="navbar-item">
          {user && <p className={cn(open_Sans_400.className, 'subtitle')}>{`Hello, ${user.userName}`}</p>}
        </div>
      </div>
    </nav>
  );
}
