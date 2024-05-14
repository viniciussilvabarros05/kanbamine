import {PatternFormat, PatternFormatProps} from 'react-number-format';

import {Input} from './ui/input'


export const InputTime = (props: Partial<PatternFormatProps>) =>{
    return(
        <PatternFormat 
            {...props}
            format = "##:##"
            customInput={Input}
            placeholder="00:00"
        />
    )
}