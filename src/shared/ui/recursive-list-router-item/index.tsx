import { createContext, FC, useContext, useState } from 'react'
import { navItemType } from 'shared/lib/navigation'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { ChevronIconButton } from 'shared/ui/chevron-icon-button'
import { DotIcon } from 'shared/ui/dot-icon'

const PaddingContext = createContext(0)

export const RecursiveListRouterItem: FC<{ item: navItemType }> = (props) => {
    const { item } = props
    const [isOpen, setIsOpen] = useState<boolean>(true)
    const hasChildren = item.children && item.children.length > 0
    const level = useContext(PaddingContext)
    return (
        <PaddingContext.Provider value={level + 1}>
            <Box
                sx={{
                    height: 'auto',
                    maxHeight: isOpen ? '1000px' : '50px',
                    overflow: 'hidden',
                    transition: 'max-height 1s',
                    marginLeft: `${level * 50}px`
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    {hasChildren ? (
                        <ChevronIconButton
                            onClick={() => setIsOpen((prevState) => !prevState)}
                            isOpen={isOpen}
                        />
                    ) : (
                        <DotIcon />
                    )}
                    <Typography
                        sx={{
                            typography: { sm: 'h6', xs: 'subtitle1' }
                        }}>
                        {item.path ? (
                            <Link to={item.path}>{item.displayName}</Link>
                        ) : (
                            <>{item.displayName}</>
                        )}
                    </Typography>
                </Box>
                {hasChildren &&
                    item.children?.map((el, i) => (
                        <RecursiveListRouterItem key={i} item={el} />
                    ))}
            </Box>
        </PaddingContext.Provider>
    )
}