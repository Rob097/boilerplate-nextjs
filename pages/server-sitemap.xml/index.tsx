import { GetServerSideProps } from 'next';
import { getServerSideSitemapLegacy } from 'next-sitemap';

import { Sort, View } from '@/models/criteria.model';
import { UserQ } from '@/models/user.model';
import { fetcher } from '@/services/base.service';
import UserService from '@/services/user.service';

type Changefreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
const changefreq: Changefreq = 'weekly';

const protocol = 'https';
const domain = 'my-portfolio.it';
const url = `${protocol}://${domain}`;

const englishSubPath = '';
const italianSubPath = '/it';
const i18nPaths = [englishSubPath, italianSubPath];

const generatePaths = (priority: number = 1, entities: any[], entityPath: string, entitySlug?: string) => {
    return i18nPaths.flatMap((i18nPath) =>
        entities.flatMap((entity) => {
            const slugs = entitySlug ? entity[entitySlug]?.map((e) => '/' + e.slug) : [''];
            return slugs.map((slug) => ({
                loc: `${url}${i18nPath}/users/${entity.slug}/${entityPath}${slug}`,
                lastmod: new Date().toISOString(),
                changefreq: changefreq,
                priority: priority,
            }));
        })
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const usersFilters = new UserQ(null, View.verbose, 0, 1000, new Sort(UserQ.createdAt, 'DESC'));
    const usersCriteria = UserService.getByCriteriaUrl(usersFilters);
    const usersResponse = await fetcher(usersCriteria, true);
    const users = usersResponse?.content;

    const usersPaths = generatePaths(0.9, users, 'home');

    // Add all users, projects, experiences, educations, and stories
    const fields = [
        {
            loc: `${url}`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/register`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it/register`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/contact-us`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        {
            loc: `${url}/it/contact-us`,
            lastmod: new Date().toISOString(),
            changefreq: changefreq,
            priority: 1
        },
        ...usersPaths
    ];

    return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() { }