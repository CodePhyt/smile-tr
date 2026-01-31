import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.patientStory.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.treatment.deleteMany();

  // Seed Treatments
  const treatments = await prisma.treatment.createMany({
    data: [
      {
        slug: 'dental-veneers',
        name: 'Dental Veneers (E-max Laminate)',
        shortDesc: 'Transform your smile with ultra-thin, custom porcelain veneers',
        description: 'Our E-max laminate veneers are crafted from the finest porcelain materials, providing a natural-looking, long-lasting solution for chipped, stained, or misaligned teeth. Each veneer is custom-designed to match your facial features and desired aesthetic.',
        price: 250,
        recoveryTime: '7-10 days',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
        features: [
          'Premium E-max ceramic material',
          'No tooth extraction required',
          'Stain-resistant and durable',
          'Natural translucency',
          'Minimally invasive procedure',
          '10-year warranty'
        ]
      },
      {
        slug: 'dental-implants',
        name: 'Dental Implants (Straumann/Nobel)',
        shortDesc: 'Premium titanium implants from world-leading Swiss and Swedish brands',
        description: 'We exclusively use Straumann and Nobel Biocare implants - the gold standard in dental implant technology. These titanium posts integrate with your jawbone to provide a permanent, natural-feeling tooth replacement that can last a lifetime with proper care.',
        price: 800,
        recoveryTime: '3-6 months',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
        features: [
          'Straumann or Nobel Biocare implants',
          'Osseointegration for permanent stability',
          'Prevents bone loss',
          'No damage to adjacent teeth',
          'Lifetime warranty on implant',
          '5-year warranty on crown'
        ]
      },
      {
        slug: 'teeth-whitening',
        name: 'Professional Teeth Whitening (Laser)',
        shortDesc: 'Advanced laser whitening for up to 8 shades brighter in one session',
        description: 'Our advanced laser teeth whitening system uses a combination of professional-grade whitening gel and precision laser technology to safely remove years of staining and discoloration. Achieve Hollywood-worthy results in just one appointment.',
        price: 300,
        recoveryTime: 'Immediate',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
        features: [
          'Up to 8 shades whiter',
          'Single 60-minute session',
          'Pain-free laser technology',
          'Long-lasting results (1-3 years)',
          'Enamel-safe formula',
          'Includes take-home maintenance kit'
        ]
      },
      {
        slug: 'hollywood-smile',
        name: 'Hollywood Smile Makeover',
        shortDesc: 'Complete smile transformation combining veneers, whitening, and contouring',
        description: 'The ultimate smile makeover package designed by our cosmetic dentistry experts. This comprehensive treatment combines multiple procedures including veneers, teeth whitening, gum contouring, and dental bonding to create your perfect, camera-ready smile.',
        price: 3500,
        recoveryTime: '10-14 days',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
        features: [
          '16-20 E-max veneers',
          'Smile design consultation',
          'Gum contouring if needed',
          'Professional teeth whitening',
          'Digital smile preview',
          'Luxury accommodation included',
          'Personal treatment coordinator'
        ]
      },
      {
        slug: 'full-mouth-restoration',
        name: 'Full Mouth Restoration (All-on-4/6)',
        shortDesc: 'Complete dental rehabilitation with the revolutionary All-on-4 or All-on-6 system',
        description: 'The All-on-4 or All-on-6 technique provides a complete set of upper or lower teeth supported by just 4-6 strategically placed implants. This revolutionary treatment allows patients with significant tooth loss or failing teeth to regain full dental function and aesthetics in a single surgery.',
        price: 7500,
        recoveryTime: '6-8 months',
        imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
        features: [
          'Full arch restoration (12-14 teeth)',
          'Only 4-6 implants needed per arch',
          'Immediate temporary teeth',
          'No bone grafting in most cases',
          'Premium Straumann implants',
          'Zirconia or porcelain bridges',
          'Lifetime warranty on implants',
          'VIP treatment package'
        ]
      }
    ]
  });

  console.log(`✅ Created ${treatments.count} treatments`);

  // Seed Blog Posts
  const blogPosts = await prisma.blogPost.createMany({
    data: [
      {
        slug: 'why-antalya-dental-tourism',
        title: 'Why Antalya is the Perfect Destination for Dental Tourism',
        excerpt: 'Discover why thousands of patients choose Antalya for their dental treatments every year.',
        content: 'Full blog content here...',
        category: 'antalya-guide',
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f906991dd3c?q=80&w=800&auto=format&fit=crop',
        published: true
      },
      {
        slug: 'dental-veneers-complete-guide',
        title: 'The Complete Guide to Dental Veneers in Turkey',
        excerpt: 'Everything you need to know about getting veneers in Turkey, from procedure to aftercare.',
        content: 'Full blog content here...',
        category: 'treatments',
        imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop',
        published: true
      },
      {
        slug: 'preparing-for-dental-trip',
        title: 'How to Prepare for Your Dental Treatment Trip to Turkey',
        excerpt: 'A step-by-step guide to planning your dental tourism journey.',
        content: 'Full blog content here...',
        category: 'patient-tips',
        imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
        published: true
      }
    ]
  });

  console.log(`✅ Created ${blogPosts.count} blog posts`);

  // Seed Patient Stories
  const stories = await prisma.patientStory.createMany({
    data: [
      {
        patientName: 'Sarah M.',
        treatment: 'Hollywood Smile',
        beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
        testimonial: 'I cannot believe the transformation! The team at Smile Turkey made me feel so comfortable throughout the entire process. My new smile has completely changed my confidence.',
        featured: true
      },
      {
        patientName: 'John D.',
        treatment: 'Dental Implants',
        beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
        testimonial: 'After years of hiding my smile, I finally got dental implants in Antalya. The quality of care was exceptional, and the price was less than half of what I would pay back home.',
        featured: true
      },
      {
        patientName: 'Emma L.',
        treatment: 'Dental Veneers',
        beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
        testimonial: 'The veneers look so natural! Nobody can tell they are not my real teeth. Plus, I got to enjoy a wonderful vacation in beautiful Antalya.',
        featured: false
      }
    ]
  });

  console.log(`✅ Created ${stories.count} patient stories`);

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
