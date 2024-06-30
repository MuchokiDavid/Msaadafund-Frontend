import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function Message() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState("");

    // Function to handle form submit 
    const sendEmail = (e) => {
        e.preventDefault();
        fetch('/api/v1.0/contact_form', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name,
                from_email: email,
                subject: subject,
                message: message
            })
        }).then((res) => res.json())
            .then((data) => {
                if (data.message) {
                    toast.success("Email sent successfully");
                    // Clear input fields
                    setEmail("");
                    setMessage("");
                    setSubject("");
                    setName("");
                }
                if (data.error) {
                    setErrors(data.error);
                }
            })
            .catch((err) => {
                setErrors(err);
            });
    }

    return (
        <section className="bg-white rounded-lg">
            <div className="py-4 lg:py-10 px-4 mx-auto max-w-screen-md bg-white">
                <p className="mb-4 lg:mb-8  text-base font-normal text-center text-gray-500">Got a technical issue? Want to send feedback about our feature? Need details about our Business plan? Let us know.</p>
                {errors && <p className='text-red-500'>{errors}</p>}
                <form action="#" className="space-y-6" onSubmit={sendEmail}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 "><span className='text-red-500'>*</span>Email</label>
                        <input type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required />
                    </div>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900"><span className='text-red-500'>*</span>Name</label>
                        <input type="text"
                            id="contact_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            placeholder="eg. John Doe"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required />
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-lg font-medium text-gray-900"><span className='text-red-500'>*</span>Subject</label>
                        <input type="text"
                            id="subject"
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Let us know how we can help you"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            required />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900"><span className='text-red-500'>*</span>Message</label>
                        <textarea id="message"
                            rows="6"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                            placeholder="Leave a comment..."
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            required></textarea>
                    </div>
                    <div>
                        <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300">Send message</button>
                    </div>
                </form>
            </div>
            <Toaster position='top-center' reverseOrder={false} />
        </section>
    )
}

export default Message;
