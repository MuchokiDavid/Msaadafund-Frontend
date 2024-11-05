import React from "react";
import { useAuth } from "../../context/usersContext";

function Announcement({ showingModal }) {
  const org = localStorage.getItem("org");
  const token = localStorage.getItem("token");
  const { logout } = useAuth();

  const handleClick = () => {
    if (token && org) {
      logout();
      showingModal(true);
    }
    showingModal(true);
  };
  return (
    <div
      className="announce flex items-center justify-between gap-4 px-4 py-3 text-white"
      id="defaultModal"
    >
      <button className="text-sm font-medium underline" onClick={handleClick}>
        <div
          class="flex items-center text-white text-sm font-bold px-4"
          role="alert"
        >
          <svg
            class="fill-current w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
          </svg>
          <p>
            Log in here to ensure your contributions are recorded and tracked!
          </p>
        </div>
      </button>

      <button
        type="button"
        data-modal-hide="defaultModal"
        aria-label="Dismiss"
        className="shrink-0 rounded-lg bg-black/10 p-1 transition hover:bg-black/20"
        onClick={() => {
          document.getElementById("defaultModal").classList.add("hidden");
          document.getElementById("defaultModal").classList.remove("flex");
          // document.body.classList.remove('overflow-y-hidden')
          // document.body.classList.add('overflow-y-auto')
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
    // <div id='defaultModal' class="flex items-center max-md:flex-col gap-6 bg-gradient-to-tr from-blue-700 to-purple-400 text-white px-6 py-3.5 rounded font-[sans-serif]">
    //   <p class="text-base flex-1 max-md:text-center">Log in to ensure your contributions are recorded and tracked!</p>

    //   <div>
    //     <button type="button" class="bg-white text-blue-500 py-2.5 px-5 rounded text-sm" onClick={handleClick}>
    //       Log in
    //     </button>
    //     <button
    //         type="button"
    //         data-modal-hide="defaultModal"
    //         aria-label="Dismiss"
    //         className="shrink-0 rounded-lg"
    //         onClick={() => {
    //             document.getElementById('defaultModal').classList.add('hidden')
    //             document.getElementById('defaultModal').classList.remove('flex')
    //         }}>
    //         <svg xmlns="http://www.w3.org/2000/svg"
    //             class="w-3.5 cursor-pointer fill-white inline-block ml-4" viewBox="0 0 320.591 320.591"
    //             >
    //             <path
    //                 d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
    //                 data-original="#000000" />
    //             <path
    //                 d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
    //                 data-original="#000000" />
    //         </svg>
    //     </button>

    //   </div>

    // </div>
  );
}

export default Announcement;
