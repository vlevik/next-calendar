import React from 'react';
import { open_Sans_300 } from '../styles/fonts';
import cn from 'classnames';
import 'bulma';
import '../styles/styles.scss';
import EventList from './EventList';
export default function DayLayout() {
  const workingHours: string[] = [
    '8:00',
    '8:30',
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '1:00',
    '1:30',
    '2:00',
    '2:30',
    '3:00',
    '3:30',
    '4:00',
    '4:30',
    '5:00',
  ];

  return (
    <div className="calendar">
      {workingHours.map((time: string) => (
        <div
          key={time}
          className={cn(open_Sans_300.className, 'cells', {
            primary: time.endsWith('00'),
            secondary: time.endsWith('30'),
          })}
        >
          {time}
        </div>
      ))}
      <EventList />
    </div>
  );
}
