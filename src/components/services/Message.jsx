import React from 'react'
import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

function Message() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const[email,setEmail]=useState('');
    const[name,setName]= useState("")
    const[errors, setErrors]=useState("")

    //Fuction to handle form submit 
  const  sendEmail= (e) =>{
      e.preventDefault();
      fetch('/api/v1.0/contact_form', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:name,
          from_email: email,
          subject: subject,
          message: message
        })
      }).then((res) => res.json())
        .then((data) => {
          // console.log(data.message);
          if(data.message){
            toast.success("Email sent successifully")

            // window.location="/login": Navigate
          }
          if (data.error) {
            setErrors(data.error)
          } 
        })
        .catch((err) => { setErrors(err) });
  }

  return (
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about our feature? Need details about our Business plan? Let us know.</p>
            {errors && <p className='text-red-500'>{errors}</p>}
            <form action="#" class="space-y-8" onSubmit={sendEmail}>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                    <input type="email" 
                    id="email" 
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                    placeholder="name@example.com" 
                    onChange={(event) => setEmail(event.target.value)}
                    required/>
                </div>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your name</label>
                    <input type="name" 
                    id="contact_name" 
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                    placeholder="eg. John Doe" 
                    onChange={(event) => setName(event.target.value)}
                    required/>
                </div>
                <div>
                    <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                    <input type="text" 
                    id="subject" 
                    class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                    placeholder="Let us know how we can help you" 
                    onChange={(event) => setSubject(event.target.value)}
                    required/>
                </div>
                <div class="sm:col-span-2">
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                    <textarea id="message" 
                    rows="6" 
                    onChange={(event) => setMessage(event.target.value)}
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                    placeholder="Leave a comment..."
                    required></textarea>
                </div>
                <button type="submit" class="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
            </form>
        </div>
        <Toaster position='top-center' reverseOrder= {false} />
    </section>
  )
}

export default Message