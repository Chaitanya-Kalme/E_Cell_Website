// 'use client';

// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { eventFormFields, eventFormTypes } from '../../../context/E-Summit/dataObjects';

// export default function EventRegistrationModal({ event, isOpen, onClose }) {
//   const [formData, setFormData] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const formType = eventFormTypes[event.id] || 'default';
//   const fields = eventFormFields[formType];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       console.log('Form submitted:', { event: event.id, ...formData });
//       setSubmitStatus('success');
      
//       setTimeout(() => {
//         onClose();
//         setSubmitStatus(null);
//         setFormData({});
//       }, 2000);
//     } catch (error) {
//       setSubmitStatus('error');
//       setTimeout(() => setSubmitStatus(null), 3000);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Backdrop */}
//       <motion.div
//         className="absolute inset-0 bg-black/70 backdrop-blur-sm"
//         onClick={onClose}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//       />

//       {/* Modal */}
//       <motion.div
//         className="relative bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
//         initial={{ scale: 0.9, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.9, opacity: 0 }}
//         transition={{ type: 'spring', duration: 0.5 }}
//       >
//         {/* Header */}
//         <div className={`bg-gradient-to-r ${event.color} p-6`}>
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="text-4xl">{event.icon}</span>
//                 <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
//                   {event.category}
//                 </span>
//               </div>
//               <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
//               <p className="text-white/90 text-sm">{event.description}</p>
//             </div>
//             <button
//               onClick={onClose}
//               className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//             >
//               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {fields.map((field) => (
//               <div key={field.name}>
//                 <label className="block text-sm font-medium text-gray-300 mb-2">
//                   {field.label}
//                   {field.required && <span className="text-red-400 ml-1">*</span>}
//                 </label>
                
//                 {field.type === 'select' ? (
//                   <select
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleChange}
//                     required={field.required}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
//                              text-white focus:outline-none focus:ring-2 focus:ring-blue-500
//                              transition-all"
//                   >
//                     <option value="">Select {field.label}</option>
//                     {field.options.map(option => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 ) : field.type === 'textarea' ? (
//                   <textarea
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleChange}
//                     required={field.required}
//                     maxLength={field.maxLength}
//                     rows={4}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
//                              text-white focus:outline-none focus:ring-2 focus:ring-blue-500
//                              transition-all resize-none"
//                     placeholder={`Enter ${field.label.toLowerCase()}`}
//                   />
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name] || ''}
//                     onChange={handleChange}
//                     required={field.required}
//                     min={field.min}
//                     max={field.max}
//                     className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
//                              text-white focus:outline-none focus:ring-2 focus:ring-blue-500
//                              transition-all"
//                     placeholder={`Enter ${field.label.toLowerCase()}`}
//                   />
//                 )}
//               </div>
//             ))}

//             {/* Submit Status Messages */}
//             {submitStatus === 'success' && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-sm"
//               >
//                 ✓ Registration successful! We'll contact you soon.
//               </motion.div>
//             )}

//             {submitStatus === 'error' && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm"
//               >
//                 ✗ Something went wrong. Please try again.
//               </motion.div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full py-4 rounded-xl font-semibold text-white
//                        bg-gradient-to-r ${event.color}
//                        hover:opacity-90 transition-all duration-200
//                        disabled:opacity-50 disabled:cursor-not-allowed
//                        flex items-center justify-center gap-2`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   <span>Submitting...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Complete Registration</span>
//                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                   </svg>
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }


'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { eventFormFields, eventFormTypes } from '@/context/E-Summit/dataObjects';
import { X, Send, CheckCircle, XCircle } from 'lucide-react';

export default function EventRegistrationForm({ event, isOpen, onClose }) {
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const formType = eventFormTypes[event.id] || 'individual';
  const fields = eventFormFields[formType];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', { event: event.id, ...formData });
      setSubmitStatus('success');
      
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
        setFormData({});
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-blue-400/30 shadow-2xl shadow-blue-500/20"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${event.color} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl drop-shadow-lg">{event.icon}</span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-white">
                        {event.category}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{event.title}</h2>
                    <p className="text-white/90 text-sm">Complete the registration form below</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-400 ml-1">*</span>}
                    </label>
                    
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl
                                 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all"
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : field.type === 'textarea' ? (
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        maxLength={field.maxLength}
                        rows={4}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl
                                 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all resize-none"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : field.type === 'date' ? (
                      <input
                        type="date"
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl
                                 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all"
                      />
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required}
                        min={field.min}
                        max={field.max}
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl
                                 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-all"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    )}
                    
                    {field.maxLength && field.type === 'textarea' && (
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        Max {field.maxLength} characters
                      </p>
                    )}
                  </div>
                ))}

                {/* Submit Status Messages */}
                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-sm flex items-center gap-2"
                    >
                      <CheckCircle size={20} />
                      <span>Registration successful! We'll contact you soon.</span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-sm flex items-center gap-2"
                    >
                      <XCircle size={20} />
                      <span>Something went wrong. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-6 rounded-xl font-semibold text-gray-300
                             bg-slate-700 hover:bg-slate-600
                             transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white
                             bg-gradient-to-r ${event.color}
                             hover:opacity-90 transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Complete Registration</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 pt-2">
                  * Required fields | Your information will be kept confidential
                </p>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}