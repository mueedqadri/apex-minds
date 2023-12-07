import React from "react";

interface ContactFormProps {
  contactFormAction: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactFormAction }) => {
  const contact_form_action = "/your-form-action-url";

  return (
    <div className="p-4">
      <form action={contact_form_action} method="POST">
        <div className="mb-6">
          <label htmlFor="name" className="form-label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" className="form-input" type="text" />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="form-label">
            Working Mail <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" className="form-input" type="email" />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="form-label">
            Anything else? <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            className="form-input"
            placeholder="Message goes here..."
            rows={2}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
