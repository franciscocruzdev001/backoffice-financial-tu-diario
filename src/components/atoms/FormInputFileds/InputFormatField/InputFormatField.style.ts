export const useInputFormatFieldStyle = () => {
    return {
        textField: {
            '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                    borderColor: '#1e3c72',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#1e3c72',
                },
            },
            '& .MuiInputLabel-root': {
                '&.Mui-focused': {
                    color: '#1e3c72',
                },
            },
        }
    }
};