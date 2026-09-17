"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShoppingBag,
  CheckCircle2,
  Car,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Plus,
  ArrowRight,
  X,
  PackageCheck,
  CreditCard,
  User,
  Phone,
  Mail,
  SlidersHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-hot-toast"

export interface Product {
  id: string
  name: string
  category: "Wheels & Tires" | "Body Panels" | "Lighting" | "Exterior" | "Interior"
  shortDescription: string
  price: number
  badge?: string
  svgIcon: React.ReactNode
}

// Crisp local visual representations for automotive accessories (100% offline capability)
const productIcons = {
  tires: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="85" stroke="currentColor" strokeWidth="22" className="text-zinc-800 dark:text-zinc-700" />
      <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="4" strokeDasharray="8 6" className="text-zinc-500" />
      <circle cx="100" cy="100" r="52" fill="currentColor" className="text-zinc-300 dark:text-zinc-800" stroke="currentColor" strokeWidth="6" />
      <circle cx="100" cy="100" r="28" fill="currentColor" className="text-zinc-900 dark:text-zinc-950" />
      <circle cx="100" cy="100" r="10" fill="currentColor" className="text-red-500" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1="100"
          y1="100"
          x2={100 + 46 * Math.cos((angle * Math.PI) / 180)}
          y2={100 + 46 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="text-zinc-400 dark:text-zinc-600"
        />
      ))}
    </svg>
  ),
  alloys: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="12" className="text-zinc-700 dark:text-zinc-600" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="3" className="text-amber-500" />
      <circle cx="100" cy="100" r="32" fill="currentColor" className="text-zinc-900 dark:text-zinc-950" stroke="currentColor" strokeWidth="6" />
      <circle cx="100" cy="100" r="12" fill="currentColor" className="text-amber-500" />
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 100 100)`}>
          <path d="M96 68 L88 32 L112 32 L104 68 Z" fill="currentColor" className="text-zinc-400 dark:text-zinc-500" />
          <line x1="100" y1="68" x2="100" y2="34" stroke="currentColor" strokeWidth="3" className="text-zinc-200 dark:text-zinc-300" />
        </g>
      ))}
    </svg>
  ),
  bonnet: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 45 L170 45 L155 160 L45 160 Z"
        fill="currentColor"
        className="text-zinc-800 dark:text-zinc-900"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path d="M50 65 L150 65 L140 140 L60 140 Z" fill="currentColor" className="text-zinc-700 dark:text-zinc-800" />
      <line x1="100" y1="45" x2="100" y2="160" stroke="currentColor" strokeWidth="4" className="text-red-500" />
      <rect x="75" y="80" width="50" height="8" rx="4" fill="currentColor" className="text-zinc-400" />
      <rect x="78" y="100" width="44" height="8" rx="4" fill="currentColor" className="text-zinc-400" />
      <rect x="82" y="120" width="36" height="8" rx="4" fill="currentColor" className="text-zinc-400" />
    </svg>
  ),
  headlights: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 75 Q100 45 180 85 L165 140 Q100 120 35 135 Z"
        fill="currentColor"
        className="text-zinc-900 dark:text-zinc-950"
        stroke="currentColor"
        strokeWidth="6"
      />
      <circle cx="70" cy="98" r="22" fill="currentColor" className="text-cyan-400" />
      <circle cx="70" cy="98" r="14" fill="#ffffff" />
      <circle cx="130" cy="108" r="18" fill="currentColor" className="text-cyan-500" />
      <circle cx="130" cy="108" r="10" fill="#ffffff" />
      <path d="M25 80 Q95 55 170 90" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  mirrors: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 70 Q140 40 175 100 Q150 145 60 130 L40 100 Z"
        fill="currentColor"
        className="text-zinc-800 dark:text-zinc-900"
        stroke="currentColor"
        strokeWidth="6"
      />
      <ellipse cx="105" cy="95" rx="55" ry="32" fill="currentColor" className="text-sky-200 dark:text-sky-900" stroke="currentColor" strokeWidth="3" />
      <path d="M70 85 Q115 70 145 100" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
      <rect x="25" y="90" width="22" height="36" rx="4" fill="currentColor" className="text-zinc-700" />
    </svg>
  ),
  glass: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M45 45 L155 45 L180 155 L20 155 Z"
        fill="currentColor"
        className="text-sky-100 dark:text-sky-950"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path d="M60 60 L140 60 L160 140 L40 140 Z" fill="currentColor" className="text-sky-300/40 dark:text-sky-800/40" />
      <line x1="70" y1="55" x2="50" y2="145" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <line x1="90" y1="55" x2="70" y2="145" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  doors: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M40 30 L160 55 L145 170 L50 165 Z"
        fill="currentColor"
        className="text-zinc-800 dark:text-zinc-900"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path d="M60 45 L140 62 L132 98 L58 92 Z" fill="currentColor" className="text-sky-200 dark:text-sky-900" />
      <rect x="65" y="115" width="24" height="6" rx="3" fill="currentColor" className="text-zinc-400" />
      <line x1="45" y1="160" x2="145" y2="165" stroke="currentColor" strokeWidth="4" className="text-red-500" />
    </svg>
  ),
  mats: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="35" y="30" width="130" height="140" rx="20" fill="currentColor" className="text-zinc-800 dark:text-zinc-900" stroke="currentColor" strokeWidth="6" />
      <rect x="50" y="45" width="100" height="110" rx="12" fill="currentColor" className="text-zinc-900 dark:text-zinc-950" />
      <rect x="65" y="60" width="70" height="80" rx="8" stroke="currentColor" strokeWidth="3" strokeDasharray="6 4" className="text-amber-500" />
      <line x1="65" y1="85" x2="135" y2="85" stroke="currentColor" strokeWidth="2" className="text-zinc-600" />
      <line x1="65" y1="110" x2="135" y2="110" stroke="currentColor" strokeWidth="2" className="text-zinc-600" />
      <circle cx="100" cy="140" r="4" fill="currentColor" className="text-amber-500" />
    </svg>
  ),
  exhaust: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="70" width="70" height="60" rx="10" fill="currentColor" className="text-zinc-700 dark:text-zinc-800" stroke="currentColor" strokeWidth="4" />
      <circle cx="130" cy="85" r="22" fill="currentColor" className="text-blue-900 dark:text-blue-950" stroke="#3b82f6" strokeWidth="6" />
      <circle cx="130" cy="85" r="14" fill="#18181b" />
      <circle cx="130" cy="120" r="22" fill="currentColor" className="text-blue-900 dark:text-blue-950" stroke="#3b82f6" strokeWidth="6" />
      <circle cx="130" cy="120" r="14" fill="#18181b" />
      <path d="M40 100 L10 100" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="text-zinc-600" />
    </svg>
  ),
  steering: (
    <svg viewBox="0 0 200 200" className="w-full h-full p-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="16" className="text-zinc-800 dark:text-zinc-700" />
      <rect x="94" y="18" width="12" height="16" fill="#ef4444" rx="2" />
      <circle cx="100" cy="100" r="28" fill="currentColor" className="text-zinc-900 dark:text-zinc-950" stroke="currentColor" strokeWidth="4" />
      <line x1="30" y1="100" x2="72" y2="100" stroke="currentColor" strokeWidth="8" className="text-zinc-500" />
      <line x1="128" y1="100" x2="170" y2="100" stroke="currentColor" strokeWidth="8" className="text-zinc-500" />
      <line x1="100" y1="128" x2="100" y2="168" stroke="currentColor" strokeWidth="8" className="text-zinc-500" />
      <circle cx="100" cy="100" r="8" fill="#eab308" />
    </svg>
  ),
}

export const PRODUCTS: Product[] = [
  {
    id: "tires-sport",
    name: "Ultra-Grip Sport Tires",
    category: "Wheels & Tires",
    shortDescription: "High-traction compound engineered for aggressive cornering stability and wet-road grip.",
    price: 12499,
    badge: "Popular",
    svgIcon: productIcons.tires,
  },
  {
    id: "alloys-forged",
    name: "Forged Stealth Alloy Wheels",
    category: "Wheels & Tires",
    shortDescription: "Ultra-lightweight forged aluminum multi-spoke wheels with satin matte finish.",
    price: 34999,
    badge: "Premium",
    svgIcon: productIcons.alloys,
  },
  {
    id: "bonnet-carbon",
    name: "Aerodynamic Carbon Fiber Bonnet",
    category: "Body Panels",
    shortDescription: "Direct-fit vented carbon fiber hood reducing front-end weight and enhancing air cooling.",
    price: 28999,
    badge: "Lightweight",
    svgIcon: productIcons.bonnet,
  },
  {
    id: "headlights-matrix",
    name: "Adaptive Matrix LED Headlights",
    category: "Lighting",
    shortDescription: "Dynamic dual-projector LED headlights with sequential indicators and auto-leveling.",
    price: 18499,
    badge: "Top Seller",
    svgIcon: productIcons.headlights,
  },
  {
    id: "mirrors-aero",
    name: "Aero Wing Carbon Side Mirrors",
    category: "Exterior",
    shortDescription: "Wind-tunnel tested aerodynamic mirror shells with integrated LED turn signals.",
    price: 8999,
    svgIcon: productIcons.mirrors,
  },
  {
    id: "glass-tinted",
    name: "UV Ceramic Privacy Car Glass",
    category: "Glass & Windows",
    shortDescription: "Multi-layer shatterproof safety glass with 99% UV rejection and heat insulation.",
    price: 14299,
    svgIcon: productIcons.glass,
  },
  {
    id: "doors-scissor",
    name: "Sport Scissor Car Doors Kit",
    category: "Body Panels",
    shortDescription: "Precision CNC-machined vertical door hinge conversion with high-pressure nitrogen struts.",
    price: 45999,
    badge: "Exclusive",
    svgIcon: productIcons.doors,
  },
  {
    id: "mats-7d",
    name: "7D Luxury All-Weather Foot Mats",
    category: "Interior",
    shortDescription: "Deep-dish tailored waterproof floor protection mats with non-slip dual-layer backing.",
    price: 4499,
    badge: "Essential",
    svgIcon: productIcons.mats,
  },
  {
    id: "exhaust-dual",
    name: "Titanium Dual-Tip Sport Exhaust",
    category: "Exterior",
    shortDescription: "High-flow resonance tuned titanium dual exhaust with deep acoustic exhaust note.",
    price: 22999,
    svgIcon: productIcons.exhaust,
  },
  {
    id: "steering-alcantara",
    name: "Alcantara Flat-Bottom Steering Wheel",
    category: "Interior",
    shortDescription: "Race-inspired ergonomic thumb contours, red 12 o'clock center stripe, and soft Alcantara.",
    price: 16999,
    badge: "Performance",
    svgIcon: productIcons.steering,
  },
]

interface BookingConfirmation {
  productName: string
  amount: number
  customerName: string
  phoneNumber: string
  email: string
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeBuyProduct, setActiveBuyProduct] = useState<Product | null>(null)
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null)

  // Simple Customer Details State (ONLY Name, Phone, Email)
  const [customerName, setCustomerName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [formError, setFormError] = useState("")

  const categories = ["All", "Wheels & Tires", "Body Panels", "Lighting", "Exterior", "Interior"]

  const filteredProducts =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory)

  // 1. ADD ITEM to local cart
  const handleAddItem = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    toast.success(`Item added to cart: ${product.name}`, {
      icon: "🛒",
      duration: 2500,
    })
  }

  // 2. BUY NOW FLOW
  const handleBuyNow = (product: Product) => {
    setActiveBuyProduct(product)
    setConfirmation(null)
    setFormError("")
  }

  // 3. CONFIRM BOOKING FLOW
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim()) {
      setFormError("Please enter your name.")
      return
    }
    if (!phoneNumber.trim() || phoneNumber.trim().length < 8) {
      setFormError("Please enter a valid phone number.")
      return
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Please enter a valid Gmail / Email address.")
      return
    }

    if (!activeBuyProduct) return

    setConfirmation({
      productName: activeBuyProduct.name,
      amount: activeBuyProduct.price,
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
    })

    toast.success("Booking Confirmed! Cash on Delivery.", {
      icon: "🎉",
      duration: 3500,
    })
  }

  const closeCheckoutModal = () => {
    setActiveBuyProduct(null)
    setConfirmation(null)
    setCustomerName("")
    setPhoneNumber("")
    setEmail("")
    setFormError("")
  }

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalCartAmount = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Shop Hero */}
      <section className="py-12 md:py-20 relative bg-gradient-to-b from-muted/50 via-background to-background border-b">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Official AutoVista Accessories & Parts
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            AutoVista Accessories Shop
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Upgrade, protect, and customize your vehicle with factory-grade automotive components.
            Simple browsing with instant <span className="font-semibold text-foreground">Cash on Delivery</span>.
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" />
              <span>Cash on Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>OEM Direct Fitment</span>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="h-4 w-4 text-sky-500" />
              <span>Hassle-Free Booking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <div className="container mx-auto px-4 py-10">
        {/* Filter and Cart Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Floating / Header Cart Trigger */}
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-full">
                {totalCartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Product Visual & Badge */}
              <div className="relative h-56 bg-gradient-to-br from-muted/30 to-muted/80 flex items-center justify-center p-6 border-b group-hover:scale-[1.02] transition-transform duration-300">
                {product.badge && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-bold uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                    {product.badge}
                  </span>
                )}
                <div className="w-40 h-40 flex items-center justify-center drop-shadow-md">
                  {product.svgIcon}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-bold mt-1 text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-xs text-muted-foreground">Price (COD)</span>
                    <span className="text-2xl font-extrabold text-foreground">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Actions: ADD ITEM and BUY NOW */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddItem(product)}
                      className="w-full text-xs font-semibold rounded-xl border-muted-foreground/30 hover:border-primary"
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      ADD ITEM
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleBuyNow(product)}
                      className="w-full text-xs font-bold rounded-xl shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      BUY NOW
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-md h-full bg-card border-l shadow-2xl flex flex-col justify-between p-6"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Your Cart</h2>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                      {totalCartCount} {totalCartCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                      <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>Your cart is empty.</p>
                      <Button
                        variant="link"
                        onClick={() => setIsCartOpen(false)}
                        className="mt-2 text-primary"
                      >
                        Explore Accessories
                      </Button>
                    </div>
                  ) : (
                    cart.map(({ product, quantity }) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-background p-1 flex items-center justify-center border">
                            {product.svgIcon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold">{product.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              ₹{product.price.toLocaleString("en-IN")} × {quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">
                            ₹{(product.price * quantity).toLocaleString("en-IN")}
                          </span>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              setIsCartOpen(false)
                              handleBuyNow(product)
                            }}
                            className="text-xs h-7 px-2"
                          >
                            Buy
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Payment Method:</span>
                    <span className="font-semibold text-emerald-500">Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{totalCartAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <Button
                    className="w-full text-sm font-bold rounded-xl"
                    onClick={() => {
                      setIsCartOpen(false)
                      // Use the first cart item to open checkout
                      if (cart[0]) handleBuyNow(cart[0].product)
                    }}
                  >
                    Proceed to COD Booking
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground"
                    onClick={() => setCart([])}
                  >
                    Clear Cart
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BUY NOW & COD BOOKING MODAL */}
      <AnimatePresence>
        {activeBuyProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-card border rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={closeCheckoutModal}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>

              {!confirmation ? (
                <div>
                  {/* Modal Header */}
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold mb-2">
                      <Truck className="h-3.5 w-3.5" />
                      Cash on Delivery Available
                    </div>
                    <h2 className="text-2xl font-bold">Quick Accessory Booking</h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      No online payment required. Pay with cash when your accessory is delivered.
                    </p>
                  </div>

                  {/* Product Summary Card */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/40 border mb-6">
                    <div className="w-16 h-16 rounded-xl bg-background p-2 flex items-center justify-center border flex-shrink-0">
                      {activeBuyProduct.svgIcon}
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-sm truncate">{activeBuyProduct.name}</h4>
                      <p className="text-xs text-muted-foreground">{activeBuyProduct.category}</p>
                      <p className="text-base font-extrabold text-primary mt-1">
                        ₹{activeBuyProduct.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {/* Customer Details Form: ONLY Name, Phone, Email */}
                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    <div>
                      <Label htmlFor="customer-name" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5">
                        <User className="h-3.5 w-3.5 text-primary" />
                        Full Name
                      </Label>
                      <Input
                        id="customer-name"
                        placeholder="e.g. Rahul Sharma"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value)
                          if (formError) setFormError("")
                        }}
                        className="rounded-xl"
                        autoFocus
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone-number" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5">
                        <Phone className="h-3.5 w-3.5 text-primary" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone-number"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value)
                          if (formError) setFormError("")
                        }}
                        className="rounded-xl"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-xs font-semibold flex items-center gap-1.5 mb-1.5">
                        <Mail className="h-3.5 w-3.5 text-primary" />
                        Gmail / Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g. rahul.sharma@gmail.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                          if (formError) setFormError("")
                        }}
                        className="rounded-xl"
                      />
                    </div>

                    {formError && (
                      <div className="p-3 text-xs text-red-500 bg-red-500/10 rounded-xl border border-red-500/20 font-medium">
                        {formError}
                      </div>
                    )}

                    {/* Payment Mode Note */}
                    <div className="p-3 rounded-xl bg-muted/60 text-xs text-muted-foreground flex items-center justify-between">
                      <span className="font-medium">Payment Mode:</span>
                      <span className="font-bold text-foreground flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        Cash on Delivery (COD)
                      </span>
                    </div>

                    {/* CONFIRM BOOKING BUTTON */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md mt-2"
                    >
                      CONFIRM BOOKING
                    </Button>
                  </form>
                </div>
              ) : (
                /* CONFIRMATION SCREEN */
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    Booking Confirmed!
                  </h3>
                  <p className="text-xs text-muted-foreground mb-6">
                    Your accessory booking has been registered. Our fulfillment desk will contact you before dispatch.
                  </p>

                  {/* Confirmation Details Card */}
                  <div className="bg-muted/40 border rounded-2xl p-5 text-left space-y-3 mb-6 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Product:</span>
                      <span className="font-bold text-foreground text-right">{confirmation.productName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-extrabold text-primary">₹{confirmation.amount.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Payment:</span>
                      <span className="font-bold text-emerald-500">Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Customer Name:</span>
                      <span className="font-medium text-foreground">{confirmation.customerName}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Phone:</span>
                      <span className="font-mono text-foreground">{confirmation.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-mono text-foreground">{confirmation.email}</span>
                    </div>
                  </div>

                  <Button
                    onClick={closeCheckoutModal}
                    className="w-full font-bold rounded-xl"
                  >
                    Done
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
