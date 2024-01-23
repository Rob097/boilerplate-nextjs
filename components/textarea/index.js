import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? theme.palette.grey[300] : theme.palette.grey[900]};
    background: ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50]};

    &:hover {
      border-color: ${theme.palette.blue[400]};
    }

    &:focus {
      border-color: ${theme.palette.blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? theme.palette.blue[600] : theme.palette.blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
);

export default Textarea;