import { Link } from 'react-router-dom';
import { useProducts } from '@/hooks/use-products';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import { LuxuryProductCard } from '@/components/ui/LuxuryProductCard';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
} as const;

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const LOOKBOOK = [
  {
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop',
    alt: 'Woman in trench coat walking city street',
    span: 'row-span-2',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    alt: 'Portrait in charcoal knitwear',
    span: '',
  },
  {
    image:
      'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1200&auto=format&fit=crop',
    alt: 'Leather ankle boot on plinth',
    span: '',
  },
  {
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    alt: 'Two models in monochrome outfits in gallery space',
    span: 'row-span-2',
  },
];

export function HomePage() {
  const { data: productsData, isLoading } = useProducts({ limit: 8 });
  const products = productsData?.items || [];
  const newArrivals = products.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* ===================== HERO ===================== */}
      <section className="relative w-full h-screen min-h-150 flex items-end justify-center overflow-hidden bg-stone-200">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2400&auto=format&fit=crop"
          alt="Fall/Winter campaign"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/50" />

        {/* Top index label */}
        <div className="absolute top-8 left-0 right-0 z-10 flex justify-between items-start px-margin-mobile md:px-16">
          <span className="caption text-white/80">Collection</span>
          <span className="caption text-white/80">01 / 01</span>
        </div>

        {/* Centered title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center px-6 pb-28 md:pb-32"
        >
          <motion.span variants={fadeInUp} className="caption text-white/70 mb-6 block">
            Fall / Winter 2026
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="editorial-heading text-5xl md:text-7xl lg:text-8xl text-white max-w-5xl mx-auto drop-shadow-lg"
          >
            The New Minimalism
          </motion.h1>
        </motion.div>

        {/* Discover corner link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-8 left-0 right-0 z-10 flex justify-center"
        >
          <Link
            to="/shop"
            className="group flex items-center gap-6 text-white"
          >
            <span className="caption border-b border-white/40 pb-1 group-hover:border-white transition-colors">
              {products.length > 0 ? `${products.length} Products` : 'Shop All'}
            </span>
            <span className="caption flex items-center gap-2">
              Discover
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* ===================== NEW ARRIVALS ===================== */}
      <section className="py-24 md:py-32 container-wide">
        <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-stone-200 pb-4">
          <h2 className="editorial-heading text-3xl md:text-5xl text-stone-900">New Arrivals</h2>
          <Link
            to="/shop"
            className="caption text-stone-500 hover:text-stone-900 transition-colors border-b border-transparent hover:border-stone-900 pb-1"
          >
            Shop All
          </Link>
        </div>

        {isLoading ? (
          <ProductGridSkeleton count={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {newArrivals.map((product) => (
              <LuxuryProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* ===================== FEATURED STORY ===================== */}
      <section className="py-24 md:py-32 bg-[#121c28] text-white">
        <div className="container-wide grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7"
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop"
              alt="Artisan inspecting fabric in a sunlit workshop"
              className="w-full aspect-4/3 object-cover rounded-sm"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="md:col-span-4 md:col-start-9 flex flex-col justify-center"
          >
            <motion.span variants={fadeInUp} className="caption text-white/50 mb-4 block">
              The Process
            </motion.span>
            <motion.h2 variants={fadeInUp} className="editorial-heading text-3xl md:text-5xl mb-6">
              Crafted for Permanence
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-white/70 text-lg leading-relaxed mb-10">
              Our commitment to sustainability is woven into every fiber. We source the finest
              organic materials and partner with artisans who share our dedication to timeless
              quality. It's not just about creating less; it's about creating better.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 caption text-white hover:opacity-70 transition-opacity group"
              >
                Read the Story
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===================== LOOKBOOK ===================== */}
      <section className="py-24 md:py-32 container-wide">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="editorial-heading text-3xl md:text-5xl text-stone-900 mb-4">
            The Lookbook
          </h2>
          <p className="text-stone-500 text-lg">Curated ensembles for the modern minimalist.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-60 md:auto-rows-70 gap-6">
          {LOOKBOOK.map((look) => (
            <Link
              key={look.image}
              to="/shop"
              className={`relative group overflow-hidden bg-stone-100 border border-stone-200 ${look.span}`}
            >
              <img
                src={look.image}
                alt={look.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="bg-stone-50 text-stone-900 caption px-4 py-2">Shop Look</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================== NEWSLETTER ===================== */}
      <section className="py-24 md:py-32 bg-stone-100 border-t border-b border-stone-200">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="editorial-heading text-3xl md:text-4xl text-stone-900 mb-4">
            Become an Insider
          </h2>
          <p className="text-stone-500 mb-8">
            Join our VIP membership for exclusive access to archival pieces, early releases, and
            private events.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Email Address"
              className="flex-1 input-line"
            />
            <button
              type="submit"
              className="bg-stone-900 text-white caption px-6 py-3 hover:bg-stone-800 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
