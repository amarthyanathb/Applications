import { useState } from 'react';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => string | null;
  };
}

interface FormErrors {
  [key: string]: string;
}

export const useFormValidation = <T extends Record<string, any>>(
  initialData: T,
  validationRules: ValidationRules
) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const validateField = (name: string, value: string): string | null => {
    const rules = validationRules[name];
    if (!rules) return null;

    if (rules.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name} must not exceed ${rules.maxLength} characters`;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `${name} format is invalid`;
    }

    if (rules.custom) {
      return rules.custom(value);
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let formIsValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const value = formData[fieldName] || '';
      const error = validateField(fieldName, value);
      if (error) {
        newErrors[fieldName] = error;
        formIsValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formIsValid);
    return formIsValid;
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setIsValid(false);
  };

  const setFieldError = (name: string, error: string) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const setFieldErrors = (newErrors: FormErrors) => {
    setErrors(newErrors);
  };

  return {
    formData,
    errors,
    isValid,
    validateForm,
    handleChange,
    resetForm,
    setFieldError,
    setFieldErrors,
    validateField
  };
};