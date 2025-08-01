"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
   Star,
   Heart,
   Filter,
   Grid,
   List,
   ShoppingCart,
   ChevronLeft,
   ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchProducts, transformProductForUI, type Product } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import StarRating from "@/components/StarRating";
import { categoryLabels, allCategories } from "@/utils/categoryMapping";

// Type definitions for UI components
type Category = string;
type SortOption = {
   value: string;
   label: string;
};

type TransformedProduct = {
   id: string;
   name: string;
   brand: string;
   price: number;
   originalPrice?: number;
   discount: number;
   rating: number;
   reviewCount: number;
   image: string;
   images: string[];
   category: string;
   inStock: boolean;
   stockCount: number;
   description: string;
   reviews: any[];
   discountPercentage: number;
};

const categories: Category[] = allCategories;
const sortOptions: SortOption[] = [
   { value: "featured", label: "Nổi bật" },
   { value: "price-low", label: "Giá: Thấp đến Cao" },
   { value: "price-high", label: "Giá: Cao đến Thấp" },
   { value: "rating", label: "Đánh giá cao nhất" },
   { value: "newest", label: "Mới nhất" },
];

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
   const [products, setProducts] = useState<TransformedProduct[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const [selectedCategory, setSelectedCategory] = useState<Category>("All");
   const [sortBy, setSortBy] = useState("featured");
   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
   const [wishlistedItems, setWishlistedItems] = useState<string[]>([]);
   const [currentPage, setCurrentPage] = useState(1);
   const { addToCart } = useCart();

   // Fetch products on component mount and when filters change
   useEffect(() => {
      const loadProducts = async () => {
         try {
            setLoading(true);
            const params: any = {};

            if (selectedCategory !== "All") {
               params.category = selectedCategory;
            }

            if (sortBy === "price-low") {
               params.sort = "price";
               params.order = "asc";
            } else if (sortBy === "price-high") {
               params.sort = "price";
               params.order = "desc";
            } else if (sortBy === "rating") {
               params.sort = "rating";
               params.order = "desc";
            }

            const response = await fetchProducts(params);
            const transformedProducts = response.data.map((product: any) => {
               const transformed = transformProductForUI(product);
               return {
                  ...transformed,
                  originalPrice:
                     transformed.originalPrice !== undefined
                        ? Number(transformed.originalPrice)
                        : undefined,
               };
            });
            setProducts(transformedProducts);
         } catch (err) {
            setError("Failed to load products");
            console.error("Error loading products:", err);
         } finally {
            setLoading(false);
         }
      };
      loadProducts();
   }, [selectedCategory, sortBy]);

   // Reset to first page when filters change
   useEffect(() => {
      setCurrentPage(1);
   }, [selectedCategory, sortBy]);

   const filteredProducts = products.filter(
      (product) =>
         selectedCategory === "All" || product.category === selectedCategory
   );

   const sortedProducts = [...filteredProducts];

   // Pagination calculations
   const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
   const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
   const endIndex = startIndex + PRODUCTS_PER_PAGE;
   const currentProducts = sortedProducts.slice(startIndex, endIndex);

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   const generatePageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;

      if (totalPages <= maxVisiblePages) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i);
         }
      } else {
         const half = Math.floor(maxVisiblePages / 2);
         let start = Math.max(1, currentPage - half);
         let end = Math.min(totalPages, start + maxVisiblePages - 1);

         if (end - start + 1 < maxVisiblePages) {
            start = Math.max(1, end - maxVisiblePages + 1);
         }

         for (let i = start; i <= end; i++) {
            pages.push(i);
         }
      }

      return pages;
   };

   const toggleWishlist = (productId: string) => {
      setWishlistedItems((prev) =>
         prev.includes(productId)
            ? prev.filter((id) => id !== productId)
            : [...prev, productId]
      );
   };
   const handleAddToCart = (product: TransformedProduct) => {
      if (!product.inStock) return;

      addToCart({
         id: product.id,
         name: product.name,
         price: product.price,
         image: product.image,
         stockCount: product.stockCount,
         discountPercentage: product.discountPercentage,
      });
   };

   const ProductCard = ({ product }: { product: any }) => {
      const isWishlisted = wishlistedItems.includes(product.id);
      if (viewMode === "list") {
         return (
            <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
               <div className="flex">
                  <div className="w-48 h-48 relative">
                     <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                     />
                     {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
                           -{product.discount}%
                        </div>
                     )}
                  </div>
                  <div className="flex-1 p-6">
                     <div className="flex justify-between items-start mb-2">
                        <div>
                           <p className="text-sm text-muted-foreground">
                              {product.brand}
                           </p>
                           <h3 className="text-lg font-semibold text-foreground hover:text-primary">
                              <Link href={`/products/${product.id}`}>
                                 {product.name}
                              </Link>
                           </h3>
                        </div>
                        <button
                           onClick={() => toggleWishlist(product.id)}
                           className="p-2 hover:bg-muted rounded-full"
                        >
                           <Heart
                              className={`w-5 h-5 ${
                                 isWishlisted
                                    ? "fill-destructive text-destructive"
                                    : "text-muted-foreground"
                              }`}
                           />
                        </button>
                     </div>{" "}
                     <div className="flex items-center space-x-2 mb-3">
                        <StarRating rating={product.rating} size="sm" />
                        <span className="text-sm text-muted-foreground">
                           ({product.reviewCount})
                        </span>
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-baseline space-x-2">
                           <span className="text-xl font-bold text-foreground">
                              {Math.round(product.price).toLocaleString()}₫
                           </span>
                           {product.originalPrice > product.price && (
                              <span className="text-sm text-muted-foreground line-through">
                                 {product.originalPrice.toLocaleString()}₫
                              </span>
                           )}
                        </div>
                        <div className="flex items-center space-x-2">
                           <span
                              className={`text-sm ${
                                 product.inStock
                                    ? "text-primary"
                                    : "text-destructive"
                              }`}
                           >
                              {product.inStock ? "In Stock" : "Out of Stock"}
                           </span>
                           <Button
                              size="sm"
                              disabled={!product.inStock}
                              onClick={() => handleAddToCart(product)}
                              className="flex items-center space-x-2"
                           >
                              <ShoppingCart className="w-4 h-4" />
                              <span>Thêm vào giỏ</span>
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );
      }
      return (
         <div className="bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
            <div className="aspect-square relative">
               <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
               />
               {product.discount > 0 && (
                  <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-medium">
                     -{product.discount}%
                  </div>
               )}
               <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-card rounded-full shadow-md hover:shadow-lg transition-shadow"
               >
                  <Heart
                     className={`w-4 h-4 ${
                        isWishlisted
                           ? "fill-destructive text-destructive"
                           : "text-muted-foreground"
                     }`}
                  />
               </button>
            </div>

            <div className="p-4">
               <p className="text-sm text-muted-foreground mb-1">
                  {product.brand}
               </p>
               <h3 className="font-semibold text-foreground mb-2 hover:text-primary">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
               </h3>{" "}
               <div className="flex items-center space-x-1 mb-2">
                  <StarRating rating={product.rating} size="sm" />
                  <span className="text-sm text-muted-foreground">
                     ({product.reviewCount})
                  </span>
               </div>
               <div className="flex items-center justify-between mb-3">
                  <div className="flex items-baseline space-x-2">
                     <span className="text-lg font-bold text-foreground">
                        {Math.round(product.price).toLocaleString()}₫
                     </span>
                     {product.originalPrice > product.price && (
                        <span className="text-sm text-muted-foreground line-through">
                           {product.originalPrice.toLocaleString()}₫
                        </span>
                     )}
                  </div>
                  <span
                     className={`text-sm ${
                        product.inStock ? "text-primary" : "text-destructive"
                     }`}
                  >
                     {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
               </div>
               <Button
                  className="w-full flex items-center justify-center space-x-2"
                  size="sm"
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
               >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Thêm vào giỏ hàng</span>
               </Button>
            </div>
         </div>
      );
   };
   return (
      <div className="min-h-screen bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
               <h1 className="text-3xl font-bold text-foreground mb-2">
                  Sản phẩm
               </h1>
               <p className="text-muted-foreground">
                  Khám phá bộ sưu tập sản phẩm tuyệt vời của chúng tôi
               </p>
            </div>
            {/* Filters and Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
               {/* Categories */}
               <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                     <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                           selectedCategory === category
                              ? "bg-primary text-primary-foreground"
                              : "bg-card text-foreground hover:bg-muted border border-border"
                        }`}
                     >
                        {categoryLabels[category]}
                     </button>
                  ))}
               </div>

               {/* Controls */}
               <div className="flex items-center space-x-4">
                  <select
                     value={sortBy}
                     onChange={(e) => setSortBy(e.target.value)}
                     className="border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground"
                  >
                     {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                           {option.label}
                        </option>
                     ))}
                  </select>

                  <div className="flex items-center border border-input rounded-md">
                     <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${
                           viewMode === "grid"
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground"
                        }`}
                     >
                        <Grid className="w-4 h-4" />
                     </button>
                     <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${
                           viewMode === "list"
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground"
                        }`}
                     >
                        <List className="w-4 h-4" />
                     </button>
                  </div>
               </div>
            </div>{" "}
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
               <p className="text-muted-foreground">
                  Hiển thị {startIndex + 1}-
                  {Math.min(endIndex, sortedProducts.length)} of{" "}
                  {sortedProducts.length} sản phẩm
               </p>
               {totalPages > 1 && (
                  <p className="text-muted-foreground text-sm">
                     Trang {currentPage} / {totalPages}
                  </p>
               )}
            </div>
            {/* Loading State */}
            {loading && (
               <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2 text-muted-foreground">
                     Đang tải sản phẩm...
                  </span>
               </div>
            )}
            {/* Error State */}
            {error && (
               <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 mb-6">
                  <p className="text-destructive">{error}</p>
                  <Button
                     variant="outline"
                     size="sm"
                     className="mt-2"
                     onClick={() => window.location.reload()}
                  >
                     Thử lại
                  </Button>
               </div>
            )}{" "}
            {/* Products Grid/List */}
            {!loading && !error && (
               <div
                  className={
                     viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        : "space-y-4"
                  }
               >
                  {currentProducts.length > 0 ? (
                     currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                     ))
                  ) : (
                     <div className="col-span-full text-center py-12">
                        <p className="text-muted-foreground text-lg">
                           Không tìm thấy sản phẩm nào
                        </p>
                        <p className="text-muted-foreground/60 text-sm mt-2">
                           Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                        </p>
                     </div>
                  )}
               </div>
            )}
            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
               <div className="flex justify-center items-center mt-12 space-x-2">
                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => handlePageChange(currentPage - 1)}
                     disabled={currentPage === 1}
                     className="flex items-center space-x-1"
                  >
                     <ChevronLeft className="w-4 h-4" />
                     <span>Trước</span>
                  </Button>

                  <div className="flex space-x-1">
                     {generatePageNumbers().map((page) => (
                        <Button
                           key={page}
                           variant={
                              currentPage === page ? "default" : "outline"
                           }
                           size="sm"
                           onClick={() => handlePageChange(page)}
                           className="w-10 h-10"
                        >
                           {page}
                        </Button>
                     ))}
                  </div>

                  <Button
                     variant="outline"
                     size="sm"
                     onClick={() => handlePageChange(currentPage + 1)}
                     disabled={currentPage === totalPages}
                     className="flex items-center space-x-1"
                  >
                     <span>Tiếp</span>
                     <ChevronRight className="w-4 h-4" />
                  </Button>
               </div>
            )}
         </div>
      </div>
   );
}
