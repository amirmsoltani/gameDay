import { Box, Button, Fade, Grid, Grow, styled, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { SubCategories } from 'src/graphql/generated';

export const WrapperCategory = styled(Box)({
    maxWidth: '1300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '750px',
    position: 'relative',
    width: '100%'
});

export const CategoryList = styled(Grid)({
    width: '100%',
    height: '100%',
    position: 'absolute'
});

export const CategoryRow = styled(Grid)<{ dir: string }>(({ theme, dir }) => ({
    width: '37%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-end'
}));

export const CategoryButton = styled(Button)(({ theme }) => ({
    color: theme.palette.common.black,
    backgroundColor: '#D3E9ED',
    padding: '13px 23px',
    borderRadius: 20,
    fontSize: 21,
    fontWeight: 'bold',
    zIndex: 1,
    ':hover': {
        backgroundColor: '#D3E9ED',
        boxShadow: '0px 1px 5px 0px #00000021',
        zIndex: 5
    }
}));

export const WrapperSubCategory = styled(Box)(({ theme }) => ({
    backgroundColor: '#FCFDFD',
    border: `${theme.palette.primary.dark} solid 0.2px`,
    boxShadow: '1px 2px 8px #4D6F762e',
    position: 'absolute',
    top: '50%',
    right: 0,
    zIndex: 2,
    borderRadius: 20,
    width: '100%',
    padding: '2rem 0 1rem'
}));

export const SubCategoryItem = styled(Typography)(({ theme }) => ({
    padding: '7px 0',
    paddingLeft: '1rem',
    cursor: 'pointer',
    textAlign: 'left',
    ':hover': {
        backgroundColor: theme.palette.secondary.main,
        color: '#FDFDFD'
    }
}));

export const CategoryItem = styled(
    (
        props: React.ComponentProps<typeof Box> & {
            subCategories: SubCategories[];
            name: string;
        }
    ) => {
        const [onHover, setOnHover] = useState(false);

        return (
            <Box {...props}>
                <Box
                    onMouseEnter={() => {
                        setOnHover(true);
                    }}
                    onMouseLeave={() => {
                        setOnHover(false);
                    }}
                    style={{ position: 'relative', display: 'inline-block' }}>
                    <Link
                        href={{
                            pathname: '/exercises',
                            query: {
                                category: encodeURI(props.name.toLocaleLowerCase())
                            }
                        }}>
                        <CategoryButton>{props.children}</CategoryButton>
                    </Link>
                    <Fade in={onHover} style={{ height: '0', visibility: 'visible' }}>
                        <div>
                            <WrapperSubCategory>
                                {props.subCategories.map((item) => (
                                    <Link
                                        href={{
                                            pathname: '/exercises',
                                            query: {
                                                category: encodeURI(props.name.toLocaleLowerCase()),
                                                sub_category: encodeURI(
                                                    item.name.toLocaleLowerCase()
                                                )
                                            }
                                        }}
                                        key={item.id}>
                                        <SubCategoryItem>{item.name}</SubCategoryItem>
                                    </Link>
                                ))}
                            </WrapperSubCategory>
                        </div>
                    </Fade>
                </Box>
            </Box>
        );
    }
)<{ size: string; dir: string }>(({ theme, dir, size }) => ({
    width: size + '%',
    position: 'relative',
    ':before': {
        content: "''",
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#81B1E5',
        width: '100%',
        height: 1
    },
    ':after': {
        content: "''",
        left: dir === 'rtl' ? 0 : 'auto',
        right: dir === 'ltr' ? 0 : 'auto',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        backgroundColor: '#81B1E5',
        width: '10px',
        height: '10px',
        borderRadius: '50%'
    }
}));
