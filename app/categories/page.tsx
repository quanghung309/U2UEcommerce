"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const categories = [
   {
      id: "electronics",
      name: "Electronics",
      description: "Latest gadgets and tech accessories",
      image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      productCount: 245,
   },
   {
      id: "fashion",
      name: "Fashion",
      description: "Trendy clothing and accessories",
      image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      productCount: 189,
   },
   {
      id: "home",
      name: "Home & Garden",
      description: "Everything for your home and garden",
      image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      productCount: 156,
   },
   {
      id: "sports",
      name: "Sports & Outdoors",
      description: "Gear for your active lifestyle",
      image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      productCount: 98,
   },
   {
      id: "beauty",
      name: "Beauty & Personal Care",
      description: "Beauty products and personal care items",
      image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      productCount: 134,
   },
   {
      id: "books",
      name: "Books & Media",
      description: "Books, movies, music and more",
      image: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
      productCount: 267,
   },
];

export default function CategoriesPage() {
   return (
      <div className="min-h-screen bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="text-center mb-12">
               <h1 className="text-4xl font-bold text-foreground mb-4">
                  Shop by Category
               </h1>
               <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Discover products organized by category to find exactly what
                  you're looking for
               </p>
            </div>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {categories.map((category) => (
                  <Link
                     key={category.id}
                     href={`/products?category=${category.id}`}
                     className="group cursor-pointer"
                  >
                     <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-border">
                        <div className="aspect-video relative">
                           <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                           />
                           <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center text-white">
                                 <h3 className="text-2xl font-bold mb-2">
                                    {category.name}
                                 </h3>
                                 <p className="text-sm opacity-90">
                                    {category.productCount} products
                                 </p>
                              </div>
                           </div>
                        </div>

                        <div className="p-6">
                           <p className="text-muted-foreground mb-4">
                              {category.description}
                           </p>
                           <div className="flex items-center justify-between">
                              <span className="text-primary font-semibold group-hover:text-primary/80">
                                 Browse Category
                              </span>
                              <ArrowRight className="h-5 w-5 text-primary group-hover:text-primary/80 group-hover:translate-x-1 transition-all" />
                           </div>
                        </div>
                     </div>
                  </Link>
               ))}
            </div>{" "}
            {/* Featured Category */}
            <div className="mt-16">
               <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                     <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                           New Electronics Collection
                        </h2>
                        <p className="text-primary-foreground/80 mb-6 text-lg">
                           Discover the latest in technology with our curated
                           collection of premium electronics. From smartphones
                           to smart home devices, find everything you need.
                        </p>
                        <Link
                           href="/products?category=electronics"
                           className="inline-flex items-center bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
                        >
                           Shop Electronics
                           <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                     </div>
                     <div className="relative">
                        <div className="aspect-square bg-primary-foreground/10 rounded-xl backdrop-blur-sm border border-primary-foreground/20 p-8">
                           <div className="w-full h-full bg-primary-foreground/20 rounded-lg"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            {/* Popular Categories */}
            <div className="mt-16">
               <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                  Most Popular Categories
               </h2>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categories.slice(0, 4).map((category) => (
                     <Link
                        key={`popular-${category.id}`}
                        href={`/products?category=${category.id}`}
                        className="group text-center p-4 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow border border-border"
                     >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                           <span className="text-2xl">📱</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">
                           {category.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                           {category.productCount} items
                        </p>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
