// DESIGN.md Constitution: SEO Standards
// Structured Data for Google Rich Results (Organization + LocalBusiness)

'use client';

import Script from 'next/script';

export default function StructuredData() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Dentist',
        name: 'Smile Turkey Dental Clinic',
        description: 'Premium dental tourism clinic in Antalya, Turkey offering Hollywood Smile, veneers, implants with lifetime warranty.',
        url: 'https://smileturkey.com',
        logo: 'https://smileturkey.com/logo.png',
        image: 'https://smileturkey.com/og-image.jpg',
        telephone: '+90-242-XXX-XXXX',
        email: 'info@smileturkey.com',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Dental Clinic Address',
            addressLocality: 'Antalya',
            addressRegion: 'Antalya',
            postalCode: '07XXX',
            addressCountry: 'TR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 36.8969,
            longitude: 30.7133,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
            },
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '09:00',
                closes: '14:00',
            },
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '4832',
            bestRating: '5',
            worstRating: '1',
        },
        priceRange: '$$',
        sameAs: [
            'https://www.facebook.com/smileturkey',
            'https://www.instagram.com/smileturkey',
            'https://twitter.com/smileturkey',
        ],
    };

    const medicalProcedureSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: 'Dental Implant Surgery',
        description: 'Titanium dental implants with lifetime warranty, 99.8% success rate',
        procedureType: 'Dental Implant',
        followup: 'Free lifetime checkups and warranty support',
        howPerformed: 'Minimally invasive surgery with premium titanium implants',
        preparation: 'Comprehensive consultation and 3D imaging',
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://smileturkey.com',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Treatments',
                item: 'https://smileturkey.com/treatments',
            },
        ],
    };

    return (
        <>
            <Script
                id="organization-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema),
                }}
            />
            <Script
                id="medical-procedure-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(medicalProcedureSchema),
                }}
            />
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
        </>
    );
}
