import { Container, Typography } from "@mui/material";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from "next/head";
import { useRouter } from 'next/router';

const UserHome = () => {
    const router = useRouter();
    const { userSlug } = router.query;

    return (
        <>
            <Head>
                <title>{`TITLE OF THE PROJECT`}</title>
            </Head>

            <Container maxWidth="lg" className='px-12 lg:px-6 relative' sx={{ zIndex: 1 }}>
                <Typography variant="h1" fontWeight="bold" color="primary" className='text-center mt-8'>Nome e cognome</Typography>
                <Typography variant="h2" fontWeight="bold" color="primary" className='text-center mt-8'>{userSlug}</Typography>
            </Container>
        </>
    );
}

export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context;

    try {
        for (const locale of locales) {
            paths.push(
                {
                    params: {
                        userSlug: "roberto-dellantonio"
                    },
                    locale
                }
            );
        }
    } catch (error) {
        console.debug("Error in user home getStaticPaths");
    }

    return {
        fallback: 'blocking',
        paths
    }
}

export async function getStaticProps(context) {

    let props = {};
    const revalidate = 10;

    const locale = context.locale;

    props = {
        ...(await serverSideTranslations(locale))
    }

    return {
        props,
        revalidate
    }
}


/*
export async function getStaticPaths(context) {
    const paths = [];
    const { locales } = context;

    try {
        const slugsResponse = await fetcher(UserService.getAllSlugsUrl());

        for (const locale of locales) {
            for (const slug of slugsResponse?.content) {
                paths.push(
                    {
                        params: {
                            userSlug: slug
                        },
                        locale
                    }
                );
            }
        }
    } catch (error) {
        console.debug("Error in user home getStaticPaths");
    }

    return {
        fallback: 'blocking',
        paths
    }
}

export async function getStaticProps(context) {

    let props = {};
    const revalidate = 10;

    try {
        const locale = context.locale;

        const url = UserService.getBySlugUrl(context.params.userSlug, 'verbose');
        const userResponse = await fetcher(url);

        if (!userResponse?.content || User.isEmpty(userResponse?.content)) {
            return {
                notFound: true,
                revalidate: revalidate
            }
        }

        props = {
            ...(await serverSideTranslations(locale)),
            user: userResponse?.content,
            messages: userResponse?.messages,
            fallback: {
                [url]: userResponse
            },
        }
    } catch (error) {
        props = {
            error: JSON.parse(JSON.stringify(error))
        }
    }

    return {
        props,
        revalidate
    }
}*/

/* 
If data changes really frequently, we can use getServerSideProps instead of getStaticProps and getStaticPaths.
This way, the page will be rendered on each request, so we can be sure that the data is always up to date.
export async function getServerSideProps(context) {
    const locale = context.locale;
    // const request = context.req;
    // const response = context.res;

    // Fetch translations for the specific user's locale
    const translations = await serverSideTranslations(locale, ['user-home', 'common']);

    return {
        props: {
            ...translations,
        },
    };
} */

export default UserHome;