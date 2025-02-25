"use client"

import { Badge, Calendar, Popover, Whisper } from 'rsuite';
import Header from '../_components/header';
import {useEffect, useState} from 'react'
import { db } from '@/_firebase/config';
import { TaskProps } from '@/entities/task';
import { useAuth } from '@/providers/authContext';

const Celendar = () => {
    const [events, setEvents] = useState<TaskProps[]>([])
    const {user} = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const activeButtons:any = {
        1: "bg-red_100 ",
        2: "bg-orange_100 ",
        3: "bg-green_100 ",
      };
    useEffect(() => {
        const unsubscribe = db.collection("tasks").where("userId", '==', user?.uid!).onSnapshot((querySnaphot) => {
          let Events: TaskProps[] = [];
          querySnaphot.forEach((doc) => {
            Events.push({
              ...doc.data(),
            } as TaskProps);
          });
          setEvents(Events);
          setIsLoading(false)
        });
        return () => unsubscribe();
      }, []);
    
    function renderCell(date: Date) {
       date.setHours(0, 0, 0, 0);
        const currentDayList = events.filter((event)=> event.deadline === date.toISOString() )
        const displayList = currentDayList.filter((item, index) => index < 2);

        if (currentDayList.length) {
            const moreCount = currentDayList.length - displayList.length;
            const moreItem = (
              <li>
                <Whisper
                  placement="top"
                  trigger="click"
                  speaker={
                    <Popover>
                      {currentDayList.map((item, index) => (
                        <p key={index} className={`${activeButtons[item.status] as string} rounded-sm mb-[0.4rem] pl-[0.4rem] text-[0.8rem] truncate text-gray-800`}>
                          {item.title}
                        </p>
                      ))}
                    </Popover>
                  }
                >
                  <a className='text-primary'>{moreCount} mais</a>
                </Whisper>
              </li>
            );
      
            return (
              <ul className="text-start">
                {(displayList as TaskProps[]).map((item, index) => (
                  <li key={index} className={`${activeButtons[item.status] as string} rounded-sm mb-[0.4rem] pl-[0.4rem] text-[0.8rem] truncate`}>
                    <Badge /> {item.title}
                  </li>
                ))}
                {moreCount ? moreItem : null}
              </ul>
            );
          }
      
          return null;

    }
    return ( 
        <> 
        <Header title="Calendário"/>
            <Calendar bordered className="mt-24 text-gray-800"  cellClassName={(date)=>("h-[40px]")} renderCell={renderCell}/>
        </>
     );
}
 
export default Celendar;