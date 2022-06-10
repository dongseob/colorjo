import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon, HashtagIcon } from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Example() {
  return (
    <Popover className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="flex flex-row">
              <span className="sr-only">colorjo</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/colorjo.png"
                alt="logo"
              />
              {/* <h1 className="text-2xl tracking-tight font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
                <span className="text-center block text-indigo-600">colorjo</span>
              </h1> */}
            </a>
          </div>
        </div>
      </div>
    </Popover>
  );
}
