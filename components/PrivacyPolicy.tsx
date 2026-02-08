import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';

export const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const sections = [
    {
      title: "1. Introduction",
      content: "Rayalaseema Mushroom Farm ('we', 'our', or 'us') operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our website and the choices you have associated with that data."
    },
    {
      title: "2. Information Collection and Use",
      content: "We collect several different types of information for various purposes to provide and improve our service to you. This includes:\n\n• Personal Data: When you create an account, place an order, or contact us, we may collect information such as your name, email address, phone number, postal address, and payment information.\n\n• Usage Data: We automatically collect information about how you interact with our website, including IP address, browser type, pages visited, and time spent on our site.\n\n• Cookies: We use cookies and similar tracking technologies to track activity on our website and hold certain information."
    },
    {
      title: "3. Legal Basis for Processing",
      content: "We process your personal data on the following legal bases:\n\n• Consent: You have given explicit consent for us to process your personal data.\n\n• Contract: Processing is necessary for the performance of a contract to which you are a party.\n\n• Legal Obligation: Processing is necessary for us to comply with a legal obligation.\n\n• Legitimate Interests: Processing is necessary for the purposes of our legitimate interests."
    },
    {
      title: "4. Use of Data",
      content: "Rayalaseema Mushroom Farm uses the collected data for various purposes:\n\n• To provide and maintain our website and services\n• To notify you about changes to our service\n• To process your transactions and send related information\n• To provide customer support and respond to your inquiries\n• To gather analysis or valuable information so that we can improve our service\n• To monitor the usage of our website\n• To detect, prevent and address technical and security issues\n• To send you promotional communications (with your consent)"
    },
    {
      title: "5. Security of Data",
      content: "The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits."
    },
    {
      title: "6. Retention of Data",
      content: "Rayalaseema Mushroom Farm will retain your Personal Data only for as long as necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations. Your account data will be retained for at least 5 years for accounting and legal purposes."
    },
    {
      title: "7. Transfer of Data",
      content: "Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy."
    },
    {
      title: "8. Disclosure of Data",
      content: "We may disclose your Personal Data in the good faith belief that such action is necessary to:\n\n• Comply with a legal obligation\n• Protect and defend the rights or property of Rayalaseema Mushroom Farm\n• Prevent or investigate possible wrongdoing in connection with the service\n• Protect the personal safety of users of the service or the public\n• Protect against legal liability"
    },
    {
      title: "9. Third-Party Service Providers",
      content: "We may employ third-party service providers to facilitate our services, provide services on our behalf, or assist us in analyzing how our service is used. These third parties have access to your Personal Data only to perform specific tasks on our behalf and are obligated not to disclose or use your information for any other purpose. This includes payment processors, shipping providers, and analytics services."
    },
    {
      title: "10. Links to Other Sites",
      content: "Our website may contain links to other sites that are not operated by us. This Privacy Policy applies only to our website. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policy of any website before providing your personal information."
    },
    {
      title: "11. Children's Privacy",
      content: "Our service is not addressed to anyone under the age of 18 ('Children'). We do not knowingly collect personally identifiable information from anyone under 18. If we become aware that we have collected personal data from a child without verifiable parental consent, we take steps to remove such data and terminate any services provided."
    },
    {
      title: "12. Your Rights",
      content: "You have the right to:\n\n• Access your personal data\n• Correct inaccurate or incomplete personal data\n• Request deletion of your personal data\n• Opt-out of marketing communications\n• Data portability (receive a copy of your data in a structured format)\n• Lodge a complaint with your local data protection authority\n\nTo exercise any of these rights, please contact us at rayalaseemamushroomfarm@gmail.com."
    },
    {
      title: "13. Changes to This Privacy Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date at the top of this Privacy Policy. Your continued use of the website following the posting of revised Privacy Policy means that you accept and agree to the changes."
    },
    {
      title: "14. Contact Us",
      content: "If you have any questions about this Privacy Policy or your personal data, please contact us at:\n\nEmail: rayalaseemamushroomfarm@gmail.com\nPhone: +91 9100982233\nAddress: Rayalaseema Mushroom Farm, Andhra Pradesh, India"
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
        <h1 className="text-4xl md:text-5xl font-serif max-w-4xl mx-auto">Privacy Policy</h1>
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
            Your privacy is important to us. This Privacy Policy explains how Rayalaseema Mushroom Farm collects, uses, discloses, and safeguards your information when you visit our website.
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
              <p className="text-earth-700 leading-relaxed whitespace-pre-line">{section.content}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-16 p-6 bg-moss-50 border-l-4 border-moss-700 rounded"
          >
            <h3 className="text-xl font-serif text-earth-900 mb-2">Data Protection Officer</h3>
            <p className="text-earth-700">
              For any privacy-related inquiries, concerns, or to exercise your data subject rights, you can contact our Data Protection Officer at privacy@rayalaseemamushrooms.com.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
