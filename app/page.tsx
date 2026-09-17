"use client"

import React, { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, useGLTF } from "@react-three/drei"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import {
  ChevronRight,
  Car,
  Palette,
  Cog,
  Upload,
  Sun,
  ShoppingBag,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/nextjs"
import { Gallery } from "@/components/gallery"

// Static 3D Car Model Component outside LandingPage to prevent remounting
function CarModel() {
  const { scene } = useGLTF("/assets/models/car.glb")
  return (
    <primitive
      object={scene}
      scale={[2.8, 3.0, 3.1]}
      position={[0, -1.8, 0]}
      rotation={[0, Math.PI / 4, 0]}
    />
  )
}

// Memoized feature card outside LandingPage to prevent remounting and layout shifts
const FeatureCard = React.memo(function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: any
  title: string
  description: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
        <Icon className="text-primary w-6 h-6" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
})

const carData = [
  {
    title: "Mahindra Thar",
    src: "/assets/image/amjith-s-8G4hNKdu60M-unsplash.jpg",
    description: "A rugged, all-black Mahindra Thar showcasing its off-road capabilities and commanding presence.",
  },
  {
    title: "Toyota Supra Mk IV",
    src: "/assets/image/anastase-maragos-Lrfuy93_hAc-unsplash.jpg",
    description: "Iconic sports car with a sleek, aerodynamic design and powerful performance capabilities.",
    link: "/car/bmw",
  },
  {
    title: "Land Rover Defender",
    src: "/assets/image/karsten-winegeart-afDsNrec8gI-unsplash.jpg",
    description: "Premium off-road SUV combining luxury with exceptional terrain-conquering capabilities.",
    link: "/car/lambo",
  },
  {
    title: "Tesla Roadster",
    src: "/assets/image/tesla-fans-schweiz-7_OQMgoGzDw-unsplash.jpg",
    description: "Revolutionary electric sports car setting new standards in performance and innovation.",
    link: "/car/tesla",
  },
  {
    title: "Dodge Ram 1500",
    src: "/assets/image/stevosdisposable-6DnSGv4VZlo-unsplash.jpg",
    description: "Powerful full-size pickup truck offering unmatched towing capacity and premium comfort.",
    link: "/car/dodge",
  },  
  {
    title: "AC Cobra",
    src: "/assets/image/live-car-p635p3cj7x0qkf44.jpg",
    description: "Legendary British sports car known for its raw power and timeless design.",
    link: "/car/ac",
  },
]

const words = [
  {
    text: "Customize",
  },
  {
    text: "Your",
  },
  {
    text: "Car",
  },
  {
    text: "With",
  },
  {
    text: "Fun",
    className: "text-blue-500 dark:text-blue-500",
  },
]

export default function LandingPage() {
  const router = useRouter()
  const { isSignedIn } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCustomizeClick = () => {
    if (isSignedIn) {
      router.push("/customize")
    } else {
      router.push("/sign-in")
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 md:py-32 relative bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-gray-900 dark:to-black overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="absolute inset-0 z-0 pointer-events-none">
              {mounted && (
                <Canvas className="w-full h-full !bg-transparent" camera={{ position: [0, 0, 10], fov: 45 }}>
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[10, 10, 5]} intensity={1.5} />
                  <directionalLight position={[-10, 5, -5]} intensity={0.8} />
                  <PresentationControls global polar={[-Math.PI / 6, Math.PI / 6]} azimuth={[-Math.PI / 4, Math.PI / 4]}>
                    <Suspense fallback={null}>
                      <CarModel />
                    </Suspense>
                  </PresentationControls>
                </Canvas>
              )}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg text-primary dark:text-white">
              Customize Your Dream Car in 3D
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg drop-shadow-md">
              AutoVista lets you visualize and personalize your car with our interactive 3D customization platform.
            </p>
            <div className="flex flex-wrap gap-4 relative z-10 items-center">
              <Button size="lg" className="group relative z-10" onClick={handleCustomizeClick}>
                Start Customizing
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="secondary" asChild className="relative z-10 shadow-md">
                <Link href="/shop">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  SHOP NOW
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="relative z-10">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </motion.div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Customization Features
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} viewport={{ once: true }} className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to visualize and personalize your dream car
            </motion.p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={Car} title="Interactive 3D Viewer" description="Explore every angle of your car with our interactive 3D model viewer powered by Three.js." delay={0.1} />
            <FeatureCard icon={Palette} title="Color Customization" description="Choose from a wide range of colors or create your own custom shade for the perfect look." delay={0.2} />
            <FeatureCard icon={Cog} title="Accessory Customization" description="Personalize wheels, headlights, and interior colors to match your style preferences." delay={0.3} />
            <FeatureCard icon={Upload} title="Upload Your Models" description="Import your own 3D models created in Blender or other 3D software for customization." delay={0.4} />
            <FeatureCard icon={Sun} title="Light & Dark Mode" description="Enjoy a comfortable viewing experience with support for both light and dark themes." delay={0.5} />
            <FeatureCard icon={ChevronRight} title="Save & Share" description="Save your customizations and share them with friends or download for future reference." delay={0.6} />
          </div>
        </div>
      </section>

      {/* Car Showcase Section */}
      <section id="upload" className="w-full px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[110px]">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base">
            The road to freedom starts from here
          </p>
          <TypewriterEffectSmooth words={words} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {carData.map((car) => (
            <Gallery key={car.title} car={car} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900 text-white dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Customize Your Dream Car?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} viewport={{ once: true }} className="text-xl mb-8 max-w-2xl mx-auto opacity-90 text-gray-300">
            Jump into our 3D customization platform or explore premium accessories for your vehicle.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }} className="flex flex-wrap gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="group" onClick={handleCustomizeClick}>
              Start Customizing Now
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <Link href="/shop">
                <ShoppingBag className="mr-2 h-4 w-4" />
                SHOP NOW
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
