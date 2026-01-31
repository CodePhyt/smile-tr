import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/admin/', '/_next/'],
            },
            {
                userAgent: 'GPTBot',
                disallow: '/', // Prevent AI scraping if desired
            },
        ],
        sitemap: 'https://smileturkey.com/sitemap.xml',
    };
}
