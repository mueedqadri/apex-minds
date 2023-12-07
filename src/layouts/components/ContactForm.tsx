"use client";
import React, { useState } from "react";

interface ContactFormProps {
  contactFormAction: string;
}

interface ErrorMessages {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ contactFormAction }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<ErrorMessages>({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to sanitize input to prevent XSS
  const sanitizeInput = (input: any) => {
    const temp = document.createElement("div");
    temp.textContent = input;
    return temp.innerHTML;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});
    const nameInput = event.currentTarget.name as unknown as HTMLInputElement;
    const enteredName = sanitizeInput(nameInput.value.trim());
    const emailInput = event.currentTarget.email as unknown as HTMLInputElement;
    const enteredEmail = sanitizeInput(emailInput.value.trim());
    const messageInput = event.currentTarget
      .message as unknown as HTMLInputElement;
    const enteredMessage = sanitizeInput(messageInput.value.trim());

    let newErrors: ErrorMessages = {};
    if (enteredName === "") {
      newErrors.name = "Please enter your full name.";
    }
    if (!emailRegex.test(enteredEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (enteredMessage === "") {
      newErrors.message = "Please enter a message.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(contactFormAction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: `${enteredName} (${enteredEmail}), \n ${enteredMessage}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      {isSubmitted ? (
        <p>Thanks for reaching out. We will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="name" className="form-label">
              Full Name{" "}
            </label>
            <input id="name" name="name" className="form-input" type="text" />
            {errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="form-label">
              Email{" "}
            </label>
            <input
              id="email"
              name="email"
              className="form-input"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="form-label">
              Message{" "}
            </label>
            <textarea
              id="message"
              name="message"
              className="form-input"
              placeholder="Your message..."
              rows={2}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs italic">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
