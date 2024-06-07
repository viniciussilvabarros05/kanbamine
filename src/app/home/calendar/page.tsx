"use client"
import { Card } from '@/components/ui/card';
import { Badge, Calendar, Popover, Whisper } from 'rsuite';
import Header from '../_components/header';
import { ptBR } from "date-fns/locale";
import {useEffect, useState} from 'react'
import { db } from '@/_firebase/config';
import { TaskProps } from '@/entities/task';

const Celendar = () => {
    const [events, setEvents] = useState<TaskProps[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = db.collection("tasks").onSnapshot((querySnaphot) => {
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
        const day = date.getDate();
        const currentDayList = events.filter((event)=> new Date(event.deadline).getDate() == day)
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
                        <p key={index} className="text-gray-800">
                          {item.title}
                        </p>
                      ))}
                    </Popover>
                  }
                >
                  <a className='text-primary'>{moreCount} more</a>
                </Whisper>
              </li>
            );
      
            return (
              <ul className="text-start">
                {displayList.map((item, index) => (
                  <li key={index} className="bg-background rounded-sm mb-[0.4rem] pl-[0.4rem] text-[0.8rem] truncate">
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
        <Card className="" > 
        <Header title="Calendário"/>
            <Calendar bordered  cellClassName={(date)=>("h-[40px]")} renderCell={renderCell}/>
        </Card>
     );
}
 
export default Celendar;