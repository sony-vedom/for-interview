import { styled, type TextareaAutosizeProps } from '@mui/material'
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize/TextareaAutosize'

export type TextAreaProps = TextareaAutosizeProps

export const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    font-family: ${theme.typography.fontFamily};
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.grey['900']};
    border: 1px solid ${theme.palette.grey['400']};
    resize: none;
    
    &:hover {
      border-color: ${theme.palette.grey['900']};
    }

    &:focus {
      outline: 0;
      border-color: ${theme.palette.primary.main};
      box-shadow: 0 0 0 1px ${theme.palette.primary.light};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
)
