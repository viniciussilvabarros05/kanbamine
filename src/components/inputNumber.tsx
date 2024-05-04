import {PatternFormat, PatternFormatProps} from 'react-number-format';

import {Input} from './ui/input'


export const InputNumber = (props: Partial<PatternFormatProps>) =>{
    return(
        <PatternFormat 
            {...props}
            format = "(##)# ####-####"
            customInput={Input}
            placeholder="()9 9999-9999"
        />
    )
}