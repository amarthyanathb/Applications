import React, { useState } from 'react';
import './DemoModal.css';
import { apiService, DemoRequestData } from './services/api';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  email: string;
  company: string;
  fullName: string;
  message: string;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    company: '',
    fullName: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    email?: string;
    company?: string;
    message?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.company.trim()) {
      errors.company = 'Company name is required';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const requestData: DemoRequestData = {
          email: formData.email.trim().toLowerCase(),
          company_name: formData.company.trim(),
          full_name: formData.fullName.trim(),
          message: formData.message.trim() || undefined
        };
      
      await apiService.submitDemoRequest(requestData);
      
      setSubmitStatus('success');
      // Reset form
       setFormData({
         fullName: '',
         email: '',
         company: '',
         message: ''
       });
      setFieldErrors({});
      
      // Auto-close modal after 2.5 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2500);
    } catch (error) {
      console.error('Error submitting demo request:', error);
      
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            // Map backend field names to frontend field names
            const mappedErrors: {[key: string]: string} = {};
            Object.keys(errorData.errors).forEach(key => {
              if (key === 'full_name') {
                mappedErrors.fullName = errorData.errors[key];
              } else if (key === 'company_name') {
                mappedErrors.company = errorData.errors[key];
              } else {
                mappedErrors[key] = errorData.errors[key];
              }
            });
            setFieldErrors(mappedErrors);
            setSubmitStatus('error');
            setErrorMessage(errorData.message || 'Please fix the validation errors.');
          } else {
            setSubmitStatus('error');
            setErrorMessage(errorData.message || 'Failed to submit demo request. Please try again.');
          }
        } catch {
          setSubmitStatus('error');
          setErrorMessage(error.message);
        }
      } else {
        setSubmitStatus('error');
        setErrorMessage('Failed to submit demo request. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book a Demo</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="demo-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={fieldErrors.fullName ? 'error' : ''}
              required
              placeholder="Enter your full name"
            />
            {fieldErrors.fullName && <span className="error-message">{fieldErrors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={fieldErrors.email ? 'error' : ''}
              required
              placeholder="Enter your email address"
            />
            {fieldErrors.email && <span className="error-message">{fieldErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="company">Company *</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={fieldErrors.company ? 'error' : ''}
              required
              placeholder="Enter your company name"
            />
            {fieldErrors.company && <span className="error-message">{fieldErrors.company}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message (Optional)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Tell us about your requirements..."
              rows={4}
            />
          </div>

          {submitStatus === 'success' && (
            <div className="success-message">
              ✅ Demo request submitted successfully! We'll contact you soon.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message">
              ❌ {errorMessage}
            </div>
          )}

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Book Demo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemoModal;