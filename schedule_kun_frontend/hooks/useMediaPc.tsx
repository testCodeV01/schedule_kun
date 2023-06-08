import { useMediaQuery } from '@mui/material';

const useMediaPc = () => {
  return useMediaQuery('(min-width:600px)');
};

export default useMediaPc;
