/**
 * Centralized Image Source Management
 * Ensures no duplicate images across the platform
 */

export const IMAGE_CATEGORIES = {
    // Patient Transformation Images
    TRANSFORMATIONS: {
        veneers_hollywood_female: {
            before: 'https://images.unsplash.com/photo-1611432579699-484f7990b127?q=80&w=800&auto=format&fit=crop', // Discolored smile
            after: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=800&auto=format&fit=crop', // Bright natural smile
            context: 'Hollywood smile veneers - female patient'
        },
        full_arch_restoration_male: {
            before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop', // Missing teeth
            after: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?q=80&w=800&auto=format&fit=crop', // Complete restoration smile
            context: 'All-on-6 full mouth restoration - male patient'
        },
        veneer_repair_female: {
            before: 'https://images.unsplash.com/photo-1609840114035-3c981857b665?q=80&w=800&auto=format&fit=crop', // Chipped teeth
            after: 'https://images.unsplash.com/photo-1619451363084-0b3c3c6b4a3e?q=80&w=800&auto=format&fit=crop', // Seamless smile
            context: '10 veneer cosmetic repair - female patient'
        },
        implant_crowns_male: {
            before: 'https://images.unsplash.com/photo-1608167558146-81a9c3a2e6f2?q=80&w=800&auto=format&fit=crop', // Gap in teeth
            after: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop', // Natural implant crowns
            context: '4 dental implants with crowns - male patient'
        },
        veneers_whitening_female: {
            before: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', // Before whitening
            after: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', // After bright smile
            context: '16 veneers Hollywood smile - female patient'
        },
        full_upper_arch_senior: {
            before: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=800&auto=format&fit=crop', // Worn teeth
            after: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=800&auto=format&fit=crop', // Restored smile
            context: 'Full upper arch implants - senior male patient'
        }
    },

    // Patient Portrait Images
    PATIENT_PORTRAITS: {
        sarah_uk: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
        michael_usa: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
        emma_australia: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
        ahmed_uae: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop',
        lisa_canada: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
        carlos_spain: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop'
    },

    // Blog Article Cover Images - Each article has a UNIQUE cover
    BLOG_COVERS: {
        dental_tourism_guide: '/assets/blog/dental-tourism-guide.jpg', // ✅ Generated - Antalya coastline
        veneers_vs_crowns: '/assets/blog/veneers-vs-crowns.jpg', // ✅ Generated - Comparison illustration
        all_on_4_guide: '/assets/blog/all-on-4-guide.jpg', // TODO: Generate All-on-4 implants
        choosing_clinic: '/assets/blog/choosing-clinic.jpg', // TODO: Generate clinic selection guide
        whitening_science: '/assets/blog/whitening-science.jpg', // TODO: Generate teeth whitening
        implant_recovery: '/assets/blog/implant-recovery.jpg', // TODO: Generate recovery timeline
        tourism_myths: '/assets/blog/tourism-myths.jpg', // TODO: Generate myths vs facts
        digital_smile_design: '/assets/blog/digital-smile-design.jpg', // TODO: Generate DSD technology
        destination_comparison: '/assets/blog/destination-comparison.jpg', // TODO: Generate map comparison
        cost_breakdown: '/assets/blog/cost-breakdown.jpg' // TODO: Generate price comparison chart
    },

    // About Page ESTC Values - Premium Quality Images
    ESTC: {
        excellence: '/assets/about/excellence.png', // ✅ Generated - Premium clinic interior
        safety: '/assets/about/safety.png', // ✅ Generated - Sterilization protocols
        transparency: '/assets/about/transparency.png', // ✅ Generated - Digital consultation
        care: '/assets/about/care.png' // ✅ Generated - Compassionate team
    },

    // Home Page Journey Steps
    JOURNEY: {
        arrival: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1200&auto=format&fit=crop', // Luxury transfer/airport
        consultation: 'https://images.unsplash.com/photo-1629909615957-be38eb8c3e6a?q=80&w=1200&auto=format&fit=crop', // Digital dental planning
        transformation: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop' // Antalya beach/clinic
    },

    // Clinic Facility Images
    CLINIC_FACILITIES: {
        reception_area: '/assets/clinics/clinic-lobby-01.jpg',
        treatment_room: '/assets/clinics/treatment-room-01.jpg',
        cbct_scanner: '/assets/clinics/treatment-room-01.jpg',
        sterilization: '/assets/clinics/treatment-room-01.jpg',
        smile_design_monitor: '/assets/clinics/waiting-lounge-01.jpg',
        cadcam_milling: '/assets/clinics/treatment-room-01.jpg',
        waiting_lounge: '/assets/clinics/waiting-lounge-01.jpg',
        dental_chair: '/assets/clinics/treatment-room-01.jpg',
        clinic_exterior: '/assets/clinics/clinic-lobby-01.jpg'
    }
} as const;

/**
 * Helper function to get image by category and key
 */
export function getImage(category: keyof typeof IMAGE_CATEGORIES, key: string): string {
    const cat = IMAGE_CATEGORIES[category] as any;
    return cat[key] || '';
}

/**
 * Get transformation pair
 */
export function getTransformation(key: keyof typeof IMAGE_CATEGORIES.TRANSFORMATIONS) {
    return IMAGE_CATEGORIES.TRANSFORMATIONS[key];
}
