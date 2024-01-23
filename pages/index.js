import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const HomePage = () => {
    const { t, i18n } = useTranslation(['common']);

    return (
        <div>
            <h1>{t('helloWorld')} 👋</h1>
        </div>
    )
}

export default HomePage

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
