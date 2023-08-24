import { useState } from 'react'

import { Box, FormLabel, Input, Stack } from "@chakra-ui/react";

import { AiOutlineEye as Eye, AiOutlineEyeInvisible as EyeDashed } from 'react-icons/ai'



function InputPassword({ txt, name, placeholder, variant, size, w, onChange, onKeyDown, value }) {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <FormLabel alignItems='center' >
            
                    {txt}
                <Box w='100%' display='flex' alignItems='center'>
                    <Input name={name} type={showPassword ? 'text' : 'password'} w={w} variant={variant} placeholder={placeholder} focusBorderColor='primary' size={size} value={value}
                        // eventos
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                    />
            

            {showPassword ? (
                <EyeDashed className='eye' size='25' onClick={() => setShowPassword(false)}/>
            ): (
                <Eye className = "eye" size = '25'  onClick={() => setShowPassword(true)} />  
            )}
                </Box>

        </FormLabel>
    );
}

export default InputPassword;