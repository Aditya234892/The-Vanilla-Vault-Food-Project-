import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Link } from "react-router-dom";

const TimeOutPopUp = () => {
    const [isOpen, setIsOpen] = useState(true);
    const isLoggedIn = false; // Set this according to your authentication state
    const totalAmount = 500;  // Replace with dynamic amount if needed

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-sm sm:max-w-md p-6 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg animate__animated animate__zoomInDown duration-1000">
              {/* Login / SignUp Button */}
              <div className="text-center mt-4">
                <p className="text-xl sm:text-2xl md:text-3xl mb-4 text-amber-100" style={{ fontFamily: "Dancing Script" }}>
                  Let us infuse your life with rich flavors and the amazing taste of authenticity
                </p>
                <button
                  className="hover:text-amber-100 hover:bg-amber-800 duration-200 bg-amber-300 text-amber-800 px-4 py-2 rounded-md font-semibold text-lg sm:text-base"
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/LoginSignUp">Login / SignUp</Link>
                </button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      );
      
};

export default TimeOutPopUp;
