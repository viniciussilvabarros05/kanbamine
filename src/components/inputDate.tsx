import {PatternFormat, PatternFormatProps} from 'react-number-format';

import {Input} from './ui/input'


export const InputDate = (props: Partial<PatternFormatProps>) =>{
    return(
        <PatternFormat 
            {...props}
            format = "##-##-####"
            autoComplete={"bday-year webauthn"}
            customInput={Input}
            placeholder="--"
        />
    )
}