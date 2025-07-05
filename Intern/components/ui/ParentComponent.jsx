import React from 'react';
import Tip from './Tip';
import Button1 from '../Button1';
import Button2 from '../Button2';
import { motion } from 'framer-motion';

const ParentComponent = () => {
    return (
        <div className="relative py-10 px-4 md:px-8 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-mesh opacity-30 z-0"></div>
            <div className="absolute top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 -right-20 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="heading text-center mb-8">
                        Detailed <span className="heading-secondary">Information</span>
                    </h1>

                    <p className="text-center text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 text-lg">
                        Explore our park information, connect with our team, and learn how you can get involved with Delhi's green spaces.
                    </p>
                </motion.div>

                <motion.div
                    className="bg-3d-gradient rounded-2xl shadow-xl p-6 md:p-8 backdrop-blur-sm border border-white/20 dark:border-gray-800/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Team Section */}
                        <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/20 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Our Team</h3>
                            <Tip />
                        </div>

                        {/* Adopt Park Section */}
                        <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/20 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-4 text-green-600 dark:text-green-400">Adopt a Park</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Help maintain and improve Delhi's green spaces by adopting a park in your neighborhood.
                            </p>
                            <Button1 />
                        </div>

                        {/* Enquiry Section */}
                        <div className="bg-white/40 dark:bg-gray-800/40 rounded-xl p-6 shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/20 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-400">Get in Touch</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Have questions about our parks or services? Reach out to our team for assistance.
                            </p>
                            <Button2 />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ParentComponent;
