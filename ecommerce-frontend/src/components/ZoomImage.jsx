import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ZoomImage = ({ showZoomImage, setShowZoomImage }) => {
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={true}
      onClose={() => setShowZoomImage(false)}
      className="relative z-10"
    >
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative border overflow-hidden border-slate-500 bg-gray-50 rounded-lg shadow-xl transition-all">
            <img
              src={showZoomImage.imageUrl}
              alt="Zoomed"
              className="w-full h-full object-contain"
              style={{ width: "500px", height: "500px" }}
            />

            <button
              type="button"
              onClick={() => {
                setOpen(false), setShowZoomImage(false);
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ZoomImage;
