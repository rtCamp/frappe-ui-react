import { AutocompleteOption, AutocompleteOptionGroup } from "../components/autoComplete/types";

export const simpleOptions: AutocompleteOption[] = [
  { label: 'Apple', value: 'a' },
  { label: 'Banana', value: 'b' },
  { label: 'Cherry', value: 'c' },
];

export const groupedOptions: AutocompleteOptionGroup[] = [
  {
    group: 'Fruits',
    items: [
      { label: 'Apple', value: 'a' },
      { label: 'Banana', value: 'b' },
    ],
  },
  {
    group: 'Vegetables',
    items: [
      { label: 'Broccoli', value: 'broc' },
      { label: 'Carrot', value: 'carr' },
    ],
  },
  {
    group: 'Hidden Label Group',
    hideLabel: true,
    items: [{ label: 'Hidden', value: 'hid' }],
  },
];