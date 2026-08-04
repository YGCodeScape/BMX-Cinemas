/**
 * Universal Frontend Form & Email Submission Utility
 * Connects React frontend forms (Contact, Career, Advertise, Corporate)
 * directly to target email: servicesreserves@gmail.com
 * Supports both text/dropdown data and file uploads (Resumes/PDFs).
 */

// Web3Forms API Endpoint (Free, 100% Frontend-compatible, supports attachments & custom emails)
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Default access key for servicesreserves@gmail.com
const DEFAULT_ACCESS_KEY = "4177bba6-8722-4778-95d5-c6c5599eb4c3"; 

/**
 * Universal Form Submission Handler
 * @param {Object} params
 * @param {string} params.formType - 'contact' | 'career' | 'advertise' | 'corporate'
 * @param {Object} params.data - Form key-value pairs (name, email, phone, etc.)
 * @param {File} [params.fileAttachment] - Optional file upload (e.g. Resume PDF/DOCX for Career)
 */
export async function submitUniversalForm({ formType, data, fileAttachment }) {
  try {
    const formDataPayload = new FormData();

    // 1. Web3Forms Core Configuration
    const accessKey = data.access_key || DEFAULT_ACCESS_KEY;
    const subject = data.subject || `[BMX Cinemas ${formType.toUpperCase()}] New Inquiry from ${data.name || 'Visitor'}`;

    formDataPayload.append("access_key", accessKey);
    formDataPayload.append("subject", subject);
    formDataPayload.append("from_name", "BMX Cinemas");

    // 2. Append all dynamic form key-values (excluding keys already appended above)
    Object.keys(data).forEach((key) => {
      if (key !== 'access_key' && key !== 'subject' && data[key] !== undefined && data[key] !== null && data[key] !== '') {
        formDataPayload.append(key, data[key]);
      }
    });

    // 3. Attach file if valid file object is uploaded (e.g. Resume for Career)
    if (fileAttachment && fileAttachment instanceof File && fileAttachment.size > 0) {
      formDataPayload.append("attachment", fileAttachment);
    }

    // 4. Send via Native Fetch API
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      body: formDataPayload
    });

    const result = await response.json();

    if (result.success) {
      return { 
        success: true, 
        message: "Thank you! Your submission has been sent successfully." 
      };
    } else {
      console.warn("Web3Forms API Error Response:", result);
      return { 
        success: false, 
        error: result.message || "Failed to send email. Please verify inputs and try again." 
      };
    }
  } catch (error) {
    console.error("Form submission network error:", error);
    return { 
      success: false, 
      error: "Network error occurred. Please check your internet connection and try again." 
    };
  }
}
