import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, ProductType } from '../data/products';
import ProductGallery from '../components/product/ProductGallery';
import ProductDetails from '../components/product/ProductDetails';
import ColorSelector from '../components/product/ColorSelector';
import SizeSelector from '../components/product/SizeSelector';
import QuantitySelector from '../components/product/QuantitySelector';
import ProductSlider from '../components/home/ProductSlider';
import Product3DViewer from '../components/product/Product3DViewer';
import ProductCustomizer from '../components/product/ProductCustomizer';
import InteractiveSizeGuide from '../components/product/InteractiveSizeGuide';
import { Heart, Share2, ShoppingBag, Check, ArrowRight, X, View, Box } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AOS from 'aos';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [show3DViewer, setShow3DViewer] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);

  const productInfoRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Find the product by id
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0] || '');
      setSelectedSize(foundProduct.sizes[0] || '');

      // Find related products (same category, excluding current product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }

    // Refresh AOS when the component mounts
    AOS.refresh();

    // Reset scroll position
    window.scrollTo(0, 0);
  }, [id]);

  // Track scroll position to show/hide floating button
  useEffect(() => {
    const handleScroll = () => {
      if (productInfoRef.current) {
        const { bottom } = productInfoRef.current.getBoundingClientRect();
        setShowFloatingButton(bottom < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;

    // In a real app, this would add the product to the cart
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const toggleSizeGuide = () => setShowSizeGuide(!showSizeGuide);
  const toggle3DViewer = () => setShow3DViewer(!show3DViewer);
  const toggleCustomizer = () => setShowCustomizer(!showCustomizer);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block h-8 w-8 border-4 border-dark-900 border-t-transparent rounded-full animate-spin"
        />
        <p className="mt-4 text-dark-600">Loading product...</p>
      </div>
    );
  }

  const productDetails = {
    materials: [
      'Premium Italian fabric composition: 80% Cotton, 20% Silk',
      'Ethically sourced and sustainably manufactured',
      'Designed in New York, crafted in Italy',
      'Features signature ELYSIAN hardware and finishes',
    ],
    care: [
      'Dry clean only',
      'Do not bleach',
      'Iron on low heat if needed',
      'Store in a cool, dry place',
      'Remove belt before cleaning',
    ],
    shipping: [
      'Free standard shipping on orders over $200',
      'Express shipping available (2-3 business days)',
      'International shipping available to select countries',
      'Signature required upon delivery',
    ],
    returns: [
      '30-day return policy for unworn items',
      'Free returns on US orders',
      'Items must be unworn with original tags attached',
      'See our full return policy for details',
    ],
  };

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-sm text-dark-600">
          <Link to="/" className="hover:text-primary-800 transition-colors">Home</Link> /
          <Link to="/" className="hover:text-primary-800 transition-colors"> {product.category}</Link> /
          <span className="text-dark-800"> {product.name}</span>
        </div>
      </div>

      {/* Product details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductGallery
                images={product.images}
                name={product.name}
              />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div ref={productInfoRef} className="sticky top-24">
                <h1 className="font-playfair text-3xl md:text-4xl font-medium mb-2">{product.name}</h1>
                <div className="flex items-center mb-6">
                  {product.discount && product.discount > 0 ? (
                    <>
                      <span className="text-xl text-dark-400 line-through mr-3">${product.price.toFixed(2)}</span>
                      <span className="text-xl text-gold-700 font-medium">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)} USD
                      </span>
                      <span className="ml-3 bg-gold-500 text-white text-xs px-2 py-1">
                        {product.discount}% OFF
                      </span>
                    </>
                  ) : (
                    <span className="text-xl text-dark-800">${product.price.toFixed(2)} USD</span>
                  )}
                </div>

                <div className="mb-8">
                  <p className="text-dark-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor}
                  onSelectColor={setSelectedColor}
                />

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-dark-900">Size</h3>
                  <button
                    onClick={toggleSizeGuide}
                    className="text-sm text-dark-600 hover:text-primary-800 transition-colors underline"
                  >
                    Size Guide
                  </button>
                </div>

                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                />

                <QuantitySelector
                  quantity={quantity}
                  onIncrement={incrementQuantity}
                  onDecrement={decrementQuantity}
                />

                <div className="mt-8 space-y-4">
                  <motion.button
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                    className={`w-full py-3 px-6 flex items-center justify-center text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                      addedToCart
                        ? 'bg-dark-700 text-white'
                        : 'bg-dark-950 text-white hover:bg-dark-800'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {addedToCart ? (
                      <>
                        <Check size={18} className="mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} className="mr-2" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      onClick={toggle3DViewer}
                      className="border border-dark-300 py-3 px-6 flex items-center justify-center text-sm uppercase tracking-wider font-medium hover:bg-neutral-50 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Box size={18} className="mr-2" />
                      View in 3D
                    </motion.button>

                    <motion.button
                      onClick={toggleCustomizer}
                      className="border border-dark-300 py-3 px-6 flex items-center justify-center text-sm uppercase tracking-wider font-medium hover:bg-neutral-50 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <View size={18} className="mr-2" />
                      Customize
                    </motion.button>
                  </div>

                  <motion.button
                    className="w-full border border-dark-300 py-3 px-6 flex items-center justify-center text-sm uppercase tracking-wider font-medium hover:bg-neutral-50 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart size={18} className="mr-2" />
                    Save to Wishlist
                  </motion.button>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <button className="text-dark-800 text-sm flex items-center hover:text-primary-800 transition-colors group">
                      <Share2 size={16} className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                      Share
                    </button>
                    <div className="text-dark-600 text-sm">SKU: {product.id}</div>
                  </div>
                </div>

                {/* Product Details Component */}
                <ProductDetails {...productDetails} />
              </div>
            </motion.div>
          </div>

          {/* Pair it with section */}
          <div className="mt-24">
            <motion.h3
              className="font-playfair text-2xl md:text-3xl font-medium mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Pair it with
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/product/${relatedProduct.id}`} className="group block">
                    <div className="aspect-[3/4] overflow-hidden mb-4 bg-neutral-50">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <h4 className="font-medium text-dark-900 mb-1 group-hover:text-primary-800 transition-colors duration-300">
                      {relatedProduct.name}
                    </h4>
                    <p className="text-dark-600 text-sm">${relatedProduct.price.toFixed(2)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="font-playfair text-3xl md:text-4xl font-medium mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            You May Also Like
          </motion.h2>
          <ProductSlider />
        </div>
      </section>

      {/* Floating Add to Cart Button */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white shadow-elegant py-4 z-40 border-t border-neutral-200"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 overflow-hidden rounded-sm mr-4 hidden sm:block">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-dark-900 text-sm sm:text-base">{product.name}</h3>
                    <p className="text-dark-600 text-xs sm:text-sm">
                      {selectedColor && selectedSize ? `${selectedColor} / ${selectedSize}` : 'Select options'}
                    </p>
                  </div>
                </div>

                <motion.button
                  onClick={handleAddToCart}
                  disabled={addedToCart || !selectedColor || !selectedSize}
                  className={`py-3 px-6 flex items-center justify-center text-sm uppercase tracking-wider font-medium transition-all duration-300 ${
                    addedToCart
                      ? 'bg-dark-700 text-white'
                      : !selectedColor || !selectedSize
                        ? 'bg-neutral-300 text-dark-500 cursor-not-allowed'
                        : 'bg-dark-950 text-white hover:bg-dark-800'
                  }`}
                  whileHover={selectedColor && selectedSize ? { scale: 1.02 } : {}}
                  whileTap={selectedColor && selectedSize ? { scale: 0.98 } : {}}
                >
                  {addedToCart ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Added
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart - ${product.price.toFixed(2)}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Size Guide */}
      <InteractiveSizeGuide
        isOpen={showSizeGuide}
        onClose={toggleSizeGuide}
        productType={product.category.toLowerCase() === 'women' || product.category.toLowerCase() === 'men' ? 'tops' : 'bottoms'}
      />

      {/* 3D Viewer Modal */}
      <AnimatePresence>
        {show3DViewer && (
          <motion.div
            className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle3DViewer}
          >
            <motion.div
              className="bg-white p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-lg shadow-elegant"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-playfair text-2xl font-medium">3D View: {product.name}</h3>
                <button
                  onClick={toggle3DViewer}
                  className="text-dark-600 hover:text-dark-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <Product3DViewer
                modelPath={product.images[0]} // In a real app, this would be a 3D model path
                productName={product.name}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Customizer Modal */}
      <AnimatePresence>
        {showCustomizer && (
          <motion.div
            className="fixed inset-0 bg-dark-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCustomizer}
          >
            <motion.div
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg shadow-elegant"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-neutral-200">
                <h3 className="font-playfair text-2xl font-medium">Customize Your {product.name}</h3>
                <button
                  onClick={toggleCustomizer}
                  className="text-dark-600 hover:text-dark-900 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <ProductCustomizer
                productName={product.name}
                baseImage={product.images[0]}
                colorOptions={product.colors.map((color, index) => ({
                  name: `Color ${index + 1}`,
                  color: color,
                  image: product.images[index % product.images.length]
                }))}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductPage;