import {
  useState,
} from "react";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "../firebase/firebase";

import "./contactUs.css";


function ContactUs() {

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      phone: "",

      subject: "",

      message: "",

    });


  const [loading, setLoading] =
    useState(false);


  const [success, setSuccess] =
    useState("");


  const [error, setError] =
    useState("");


  /* ==========================================
     HANDLE INPUT CHANGE
  ========================================== */

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));

  };


  /* ==========================================
     SUBMIT FORM
  ========================================== */

  const handleSubmit = async (event) => {

    event.preventDefault();


    setLoading(true);

    setSuccess("");

    setError("");


    try {

      await addDoc(

        collection(
          db,
          "contactMessages"
        ),

        {

          name:
            formData.name.trim(),

          email:
            formData.email.trim(),

          phone:
            formData.phone.trim(),

          subject:
            formData.subject.trim(),

          message:
            formData.message.trim(),


          status:
            "new",


          createdAt:
            serverTimestamp(),

        }

      );


      setSuccess(
        "Thank you! Your message has been sent successfully."
      );


      setFormData({

        name: "",

        email: "",

        phone: "",

        subject: "",

        message: "",

      });


    } catch (error) {

      console.error(
        "Contact form error:",
        error
      );


      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <section
      className="contact-section"
    >

      <div
        className="contact-container"
      >


        {/* ======================================
            LEFT CONTENT
        ====================================== */}

        <div
          className="contact-info"
        >

          <span
            className="contact-tag"
          >
            CONTACT US
          </span>


          <h2>

            Get In Touch With Us

          </h2>


          <p>

            Have a question, suggestion, or need
            help? Send us a message and our team
            will get back to you.

          </p>


          <div
            className="contact-info-item"
          >

            <span>📧</span>

            <div>

              <strong>
                Email
              </strong>

              <p>
                support@matka.news
              </p>

            </div>

          </div>


          <div
            className="contact-info-item"
          >

            <span>📱</span>

            <div>

              <strong>
                Support
              </strong>

              <p>
                Contact our support team
              </p>

            </div>

          </div>

        </div>


        {/* ======================================
            FORM
        ====================================== */}

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >

          <h3>

            Send Us a Message

          </h3>


          {/* NAME */}

          <div
            className="form-group"
          >

            <label>

              Your Name *

            </label>

            <input

              type="text"

              name="name"

              value={formData.name}

              onChange={handleChange}

              placeholder="Enter your name"

              required

            />

          </div>


          {/* EMAIL */}

          <div
            className="form-group"
          >

            <label>

              Email Address *

            </label>

            <input

              type="email"

              name="email"

              value={formData.email}

              onChange={handleChange}

              placeholder="Enter your email"

              required

            />

          </div>


          {/* PHONE */}

          <div
            className="form-group"
          >

            <label>

              Mobile Number

            </label>

            <input

              type="tel"

              name="phone"

              value={formData.phone}

              onChange={handleChange}

              placeholder="Enter mobile number"

            />

          </div>


          {/* SUBJECT */}

          <div
            className="form-group"
          >

            <label>

              Subject *

            </label>

            <input

              type="text"

              name="subject"

              value={formData.subject}

              onChange={handleChange}

              placeholder="What is this about?"

              required

            />

          </div>


          {/* MESSAGE */}

          <div
            className="form-group"
          >

            <label>

              Message *

            </label>

            <textarea

              name="message"

              value={formData.message}

              onChange={handleChange}

              placeholder="Write your message..."

              rows="6"

              required

            />

          </div>


          {/* SUCCESS */}

          {success && (

            <div
              className="contact-success"
            >

              {success}

            </div>

          )}


          {/* ERROR */}

          {error && (

            <div
              className="contact-error"
            >

              {error}

            </div>

          )}


          {/* BUTTON */}

          <button

            type="submit"

            className="contact-submit"

            disabled={loading}

          >

            {loading

              ? "Sending..."

              : "Send Message"

            }

          </button>

        </form>

      </div>

    </section>

  );

}


export default ContactUs;