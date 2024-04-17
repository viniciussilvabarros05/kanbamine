"use client"
import { Card } from '@/components/ui/card';
import { Calendar } from 'rsuite';
import Header from '../_components/header';
import { ptBR } from "date-fns/locale";
const Celendar = () => {
    return ( 
        <Card className="" > 
        <Header title="Calendário"/>
            <Calendar bordered  cellClassName={(date)=>("h-[30px]")}/>
        </Card>
     );
}
 
export default Celendar;