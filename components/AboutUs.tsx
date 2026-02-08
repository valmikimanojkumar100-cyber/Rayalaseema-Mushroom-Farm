import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Award, BookOpen, Leaf, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC<{ onBack: () => void; onContact: () => void }> = ({ onBack, onContact }) => {
  return (
    <div className="min-h-screen bg-earth-50 text-earth-900">
      {/* Header */}
      <motion.div 
        className="bg-moss-900 text-white py-12 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-moss-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
            <span>Back</span>
          </button>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif max-w-6xl mx-auto">About Our Founder</h1>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Founder Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif text-moss-900 mb-4">Valmiki Manoj Kumar</h2>
              <p className="text-moss-700 text-lg font-semibold mb-6">Founder & Mushroom Farming Expert</p>
              
              <div className="space-y-4 text-earth-700 leading-relaxed">
                <p>
                  I'm Valmiki Manoj Kumar, a B.Tech graduate from Ananthapur District, Andhra Pradesh. While my professional qualifications are in engineering, my true passion has always been farming – a calling that has driven me since childhood.
                </p>
                <p>
                  Born into a family where my parents work in the Government Medical Department, farming has always been our family's hobby and love. Despite their busy medical careers, my parents visit our village farm in <span className="font-semibold">Pathikonda</span> near Rayalaseema once a month. This dedication to our roots inspired me to pursue my dream of becoming a professional mushroom farmer.
                </p>
              </div>
            </div>

            <motion.div
              className="bg-gradient-to-br from-moss-100 to-earth-100 rounded-2xl p-8 h-full flex flex-col justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center">
                <div className="w-24 h-24 bg-moss-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white">
                  <span className="text-4xl">🍄</span>
                </div>
                <h3 className="text-2xl font-serif text-moss-900 mb-2">VMK</h3>
                <p className="text-moss-700 font-semibold mb-8">Rayalaseema Mushroom Farm</p>
                
                <div className="space-y-4 text-left text-sm text-earth-700">
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-moss-600 min-w-max">Location:</span>
                    <span>Ananthapur District, Andhra Pradesh</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-moss-600 min-w-max">Education:</span>
                    <span>B.Tech Graduate</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="font-semibold text-moss-600 min-w-max">Focus:</span>
                    <span>Indoor Mushroom Farming</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif text-moss-900 mb-8">Professional Experience</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-moss-100 text-moss-700">
                  <BookOpen size={28} />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-semibold text-earth-900 mb-4">7 Years in Indoor Mushroom Farming</h3>
                <p className="text-earth-700 leading-relaxed mb-6">
                  Over the past 7 years, I have dedicated myself to mastering the art and science of indoor mushroom cultivation. My expertise spans across the entire farming cycle, from substrate preparation to harvest optimization.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-moss-800">Core Competencies:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-earth-700">
                        <CheckCircle2 size={18} className="text-moss-600" />
                        Climate-adapted farming techniques
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <CheckCircle2 size={18} className="text-moss-600" />
                        Optimal substrate preparation
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <CheckCircle2 size={18} className="text-moss-600" />
                        Contamination prevention & control
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-moss-800">Quality Standards:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-earth-700">
                        <CheckCircle2 size={18} className="text-moss-600" />
                        FSSAI Certification
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <CheckCircle2 size={18} className="text-moss-600" />
                        Local government approvals
                      </li>
                      <li className="flex items-center gap-2 text-earth-700">
                        <CheckCircle2 size={18} className="text-moss-600" />
                        Highest hygiene standards
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif text-moss-900 mb-8">My Journey</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf size={32} />,
                title: "Childhood Passion",
                description: "Growing up with parents who valued agriculture despite their medical careers, I developed an early interest in farming and sustainable agriculture."
              },
              {
                icon: <Award size={32} />,
                title: "7 Years of Excellence",
                description: "Hands-on experience in indoor mushroom farming, perfecting techniques and building expertise in climate-adapted cultivation methods."
              },
              {
                icon: <CheckCircle2 size={32} />,
                title: "Certified & Approved",
                description: "Achieved FSSAI certification and local government approvals, ensuring the highest quality and food safety standards for all our products."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-moss-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-earth-900 mb-4">{item.title}</h3>
                <p className="text-earth-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-moss-50 rounded-2xl p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-serif text-moss-900 mb-8">Why Partner With Us?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-moss-800 mb-4">Expertise & Experience</h3>
              <ul className="space-y-3">
                {[
                  "7+ years of proven experience in mushroom farming",
                  "Deep understanding of local climate conditions",
                  "Advanced knowledge of indoor farming techniques",
                  "Continuous learning and improvement mindset"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-earth-700">
                    <span className="text-moss-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-moss-800 mb-4">Quality & Compliance</h3>
              <ul className="space-y-3">
                {[
                  "FSSAI certified operations",
                  "Government-approved farming methods",
                  "Highest hygiene and food safety standards",
                  "Sustainable and eco-friendly practices"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-earth-700">
                    <span className="text-moss-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-moss-700 to-moss-900 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Ready to Collaborate?</h2>
          <p className="text-moss-100 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            Whether you're interested in purchasing premium mushrooms, learning our farming techniques, or collaborating on new ventures, I'd love to connect with you. Let's grow together!
          </p>
          <button
            onClick={onContact}
            className="bg-white text-moss-900 px-10 py-4 rounded-full font-semibold hover:bg-moss-50 hover:scale-105 transition-all duration-300 shadow-xl inline-block"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
};
