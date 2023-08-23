import {
    Collapse,
    Box
} from '@chakra-ui/react' 

function ErrorMessage({message}) {
    return (
        <Collapse in={true} animateOpacity>
            <Box
                p='10px'
                color='white'
                mt='2'
                bg='red.500'
                rounded='md'
                shadow='md'
            >
                {message}
            </Box>
        </Collapse>
    );
}

export default ErrorMessage;