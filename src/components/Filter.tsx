import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { XMarkIcon, ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid';

const clothesFilters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White' },
      { value: 'beige', label: 'Beige' },
      { value: 'blue', label: 'Blue' },
      { value: 'brown', label: 'Brown' },
      { value: 'green', label: 'Green' },
      { value: 'purple', label: 'Purple' },
    ],
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
      { value: '2xl', label: '2XL' },
    ],
  },
];

const accessoriesFilters = [
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'brand-a', label: 'Brand A' },
      { value: 'brand-b', label: 'Brand B' },
      { value: 'brand-c', label: 'Brand C' },
    ],
  },
  {
    id: 'material',
    name: 'Material',
    options: [
      { value: 'leather', label: 'Leather' },
      { value: 'fabric', label: 'Fabric' },
      { value: 'metal', label: 'Metal' },
    ],
  },
];

const carryFilters = [
  {
    id: 'type',
    name: 'Type',
    options: [
      { value: 'backpack', label: 'Backpack' },
      { value: 'handbag', label: 'Handbag' },
      { value: 'suitcase', label: 'Suitcase' },
    ],
  },
  {
    id: 'capacity',
    name: 'Capacity',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
];

const filterSets = {
  clothes: clothesFilters,
  accessories: accessoriesFilters,
  carry: carryFilters,
};

type FilterProps = {
  category: 'clothes' | 'accessories' | 'carry';
};

const Filter: React.FC<FilterProps> = ({ category }) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const filters = filterSets[category];

  return (
    <div>
      {/* Mobile filter dialog */}
      <Dialog open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
          >
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4">
              {filters.map((section) => (
                <Disclosure key={section.name} as="div" className="border-t border-gray-200 pb-4 pt-4">
                  <fieldset>
                    <legend className="w-full px-2">
                      <DisclosureButton className="group flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                        <span className="text-sm font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 rotate-0 transform group-data-[open]:-rotate-180"
                          />
                        </span>
                      </DisclosureButton>
                    </legend>
                    <DisclosurePanel className="px-4 pb-2 pt-4">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              id={`${section.id}-${optionIdx}-mobile`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`${section.id}-${optionIdx}-mobile`}
                              className="ml-3 text-sm text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </fieldset>
                </Disclosure>
              ))}
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Filters for larger screens */}
      <aside>
        <h2 className="sr-only">Filters</h2>

        <button
          type="button"
          onClick={() => setMobileFiltersOpen(true)}
          className="inline-flex items-center lg:hidden"
        >
          <span className="text-sm font-medium text-gray-700">Filters</span>
          <PlusIcon aria-hidden="true" className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" />
        </button>

        <div className="hidden lg:block">
          <form className="space-y-10 divide-y divide-gray-200">
            {filters.map((section, sectionIdx) => (
              <div key={section.name} className={sectionIdx === 0 ? '' : 'pt-10'}>
                <fieldset>
                  <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                  <div className="space-y-3 pt-6">
                    {section.options.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          defaultValue={option.value}
                          id={`${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            ))}
          </form>
        </div>
      </aside>
    </div>
  );
};

export default Filter;
