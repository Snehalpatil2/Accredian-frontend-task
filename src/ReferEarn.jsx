import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogPanel, DialogTitle, Transition } from "@headlessui/react";

export default function ReferEarn() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://accredian-backend-task-it93.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Referral Submitted Successfully! 🎉");
        setIsOpen(false);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Referral Submission Failed:", error);
      alert("An error occurred while submitting the referral. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-200 p-6">
      <h1 className="text-gray-800 text-5xl font-extrabold mb-4 drop-shadow-lg tracking-wide">
        Refer & Earn 🎁
      </h1>
      <p className="text-gray-700 text-lg mb-6 max-w-md text-center leading-relaxed">
        Invite your friends and earn exclusive rewards together!
      </p>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-purple-600 transition-transform transform hover:scale-105"
      >
        Refer Now
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-lg flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-md bg-white/80 p-8 rounded-3xl shadow-2xl border border-gray-300 relative backdrop-blur-md">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-all"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>

              {/* Modal Title */}
              <DialogTitle className="text-3xl font-bold text-gray-800 mb-6 text-center tracking-wide">
                ✨ Refer a Friend
              </DialogTitle>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block font-medium text-gray-600">Your Name</label>
                  <input
                    type="text"
                    {...register("referrerName", { required: "Your name is required" })}
                    className="w-full border border-gray-300 p-3 rounded-full bg-white/60 focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-gray-700"
                    placeholder="Enter your name"
                  />
                  {errors.referrerName && <p className="text-red-500 text-sm">{errors.referrerName.message}</p>}
                </div>

                <div>
                  <label className="block font-medium text-gray-600">Your Email</label>
                  <input
                    type="email"
                    {...register("referrerEmail", { required: "Your email is required" })}
                    className="w-full border border-gray-300 p-3 rounded-full bg-white/60 focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-gray-700"
                    placeholder="Enter your email"
                  />
                  {errors.referrerEmail && <p className="text-red-500 text-sm">{errors.referrerEmail.message}</p>}
                </div>

                <div>
                  <label className="block font-medium text-gray-600">Friend's Name</label>
                  <input
                    type="text"
                    {...register("refereeName", { required: "Friend's name is required" })}
                    className="w-full border border-gray-300 p-3 rounded-full bg-white/60 focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-gray-700"
                    placeholder="Enter friend's name"
                  />
                  {errors.refereeName && <p className="text-red-500 text-sm">{errors.refereeName.message}</p>}
                </div>

                <div>
                  <label className="block font-medium text-gray-600">Friend's Email</label>
                  <input
                    type="email"
                    {...register("refereeEmail", { required: "Friend's email is required" })}
                    className="w-full border border-gray-300 p-3 rounded-full bg-white/60 focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-gray-700"
                    placeholder="Enter friend's email"
                  />
                  {errors.refereeEmail && <p className="text-red-500 text-sm">{errors.refereeEmail.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-500 text-white py-3 rounded-full hover:bg-purple-600 transition-transform transform hover:scale-105"
                >
                  Submit Referral
                </button>
              </form>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
