import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export const TermsOfService: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Rayalaseema Mushroom Farm website and services, you agree to be bound by these Terms of Service. If you do not agree to abide by the above, please do not use this service."
    },
    {
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials (information or software) on Rayalaseema Mushroom Farm's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on the website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or 'mirror' the materials on any other server."
    },
    {
      title: "3. Disclaimer",
      content: "The materials on Rayalaseema Mushroom Farm's website are provided on an 'as is' basis. Rayalaseema Mushroom Farm makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      title: "4. Limitations",
      content: "In no event shall Rayalaseema Mushroom Farm or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Rayalaseema Mushroom Farm's website, even if Rayalaseema Mushroom Farm or an authorized representative has been notified orally or in writing of the possibility of such damage."
    },
    {
      title: "5. Accuracy of Materials",
      content: "The materials appearing on Rayalaseema Mushroom Farm's website could include technical, typographical, or photographic errors. Rayalaseema Mushroom Farm does not warrant that any of the materials on its website are accurate, complete, or current. Rayalaseema Mushroom Farm may make changes to the materials contained on its website at any time without notice."
    },
    {
      title: "6. Materials Not to Scale",
      content: "The materials on the website of Rayalaseema Mushroom Farm are provided 'as is'. Rayalaseema Mushroom Farm does not make any warranties, expressed or implied, and hereby disclaims and negates all other warranties. Further, Rayalaseema Mushroom Farm does not warrant or represent that the use of the materials on its website will not infringe upon the rights of third parties."
    },
    {
      title: "7. Limitations of Liability",
      content: "In no case shall Rayalaseema Mushroom Farm, its directors, officers or employees be liable for any indirect, incidental, special, punitive, or consequential damages arising out of or in any way connected with your use of this website, the products or services offered on this website, the delay or inability to use this website or the products and services offered on this website, even if Rayalaseema Mushroom Farm has been advised of the possibility of such damages."
    },
    {
      title: "8. Product Information",
      content: "Rayalaseema Mushroom Farm is committed to providing accurate information about our products. All product descriptions, prices, and availability information are subject to change without notice. We reserve the right to limit quantities and correct errors in product information at any time."
    },
    {
      title: "9. User Accounts",
      content: "If you create an account on our website, you are responsible for maintaining the confidentiality of your login credentials and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
    },
    {
      title: "10. Payment Terms",
      content: "All transactions are processed through secure payment gateways. Prices are subject to change without notice. By placing an order, you authorize us to charge your payment method for the full amount of your purchase including applicable taxes and shipping fees."
    },
    {
      title: "11. Shipping and Delivery",
      content: "We strive to provide timely delivery of products. However, we are not liable for delays in delivery or non-delivery due to circumstances beyond our control, including weather, natural disasters, or courier delays. Risk of loss passes to you upon delivery to the courier."
    },
    {
      title: "12. Returns and Refunds",
      content: "Products must be returned within 7 days of delivery in their original condition. Refunds will be processed within 10 business days of receiving and inspecting the returned items. Shipping costs are non-refundable unless the return is due to our error."
    },
    {
      title: "13. Intellectual Property Rights",
      content: "The content on this website, including text, graphics, logos, images, and software, is the property of Rayalaseema Mushroom Farm or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or transmit any content without our prior written permission."
    },
    {
      title: "14. Governing Law",
      content: "These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts located in Andhra Pradesh."
    },
    {
      title: "15. Modifications to Terms",
      content: "Rayalaseema Mushroom Farm may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service."
    },
    {
      title: "16. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at rayalaseemamushroomfarm@gmail.com or call +91 9100982233."
    }
  ];

  return (
    <div className="min-h-screen bg-earth-50 text-earth-900">
      {/* Header */}
      <motion.div 
        className="bg-earth-900 text-white py-12 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-4xl mx-auto flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-moss-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
            <span>Back</span>
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif max-w-4xl mx-auto">Terms of Service</h1>
        <p className="text-earth-300 mt-4 max-w-4xl mx-auto">Last updated: February 2026</p>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="prose prose-lg max-w-none text-earth-700"
        >
          <p className="text-lg leading-relaxed mb-12 text-earth-700">
            Welcome to Rayalaseema Mushroom Farm. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, you accept these terms and conditions in full. Do not continue to use Rayalaseema Mushroom Farm's website if you do not accept all of the terms and conditions stated on this page.
          </p>

          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * (index + 1) }}
              className="mb-8"
            >
              <h2 className="text-2xl font-serif text-earth-900 mb-4">{section.title}</h2>
              <p className="text-earth-700 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-16 p-6 bg-moss-50 border-l-4 border-moss-700 rounded"
          >
            <h3 className="text-xl font-serif text-earth-900 mb-2">Questions?</h3>
            <p className="text-earth-700">
              If you have any questions about these Terms of Service, please don't hesitate to contact us. We're here to help ensure you have the best experience possible.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
