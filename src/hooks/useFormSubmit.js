import { useState } from 'react';
import { submitUniversalForm } from '../utils/emailService';

/**
 * Custom React Hook for Managing Form State, Validation, and Email Submission
 * @param {string} formType - 'contact' | 'career' | 'advertise' | 'corporate'
 */
export function useFormSubmit(formType = 'general') {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (data, fileAttachment = null) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setIsSuccess(false);

    const result = await submitUniversalForm({
      formType,
      data,
      fileAttachment
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 7000);
      return { success: true };
    } else {
      setErrorMessage(result.error || 'Failed to submit form.');
      return { success: false, error: result.error };
    }
  };

  return {
    isSubmitting,
    isSuccess,
    errorMessage,
    handleSubmit
  };
}
