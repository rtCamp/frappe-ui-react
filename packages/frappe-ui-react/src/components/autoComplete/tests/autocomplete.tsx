import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Autocomplete from '../autoComplete';
import { simpleOptions, groupedOptions } from '../../../test-utils/mockData';
import { MemoryRouter } from 'react-router';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

describe('Autocomplete Component', () => {
 let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('1. Basic Rendering & Initial State', () => {
    test('BR-01: Renders with label and placeholder', () => {
      render(<Autocomplete options={[]} label="My Label" placeholder="My Placeholder" value={null} />);
      expect(screen.getByText('My Label')).toBeInTheDocument();
      expect(screen.getByText('My Placeholder')).toBeInTheDocument();
    });

    test('BR-02: Renders with a pre-selected value (single)', () => {
      render(<Autocomplete options={simpleOptions} value="b" placeholder="Select..." />);
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Select...')).not.toBeInTheDocument();
    });

    test('BR-03: Renders with pre-selected values (multiple)', () => {
      render(<Autocomplete options={simpleOptions} value={['a', 'c']} multiple />);
      expect(screen.getByText('Apple, Cherry')).toBeInTheDocument();
    });

    test('BR-04: Renders with a value not in the options list', () => {
      render(<Autocomplete options={simpleOptions} value="d" />);
      expect(screen.getByText('d')).toBeInTheDocument();
    });

    test('BR-05: Renders with prefix and suffix', () => {
      const prefix = jest.fn(() => <span>Prefix</span>);
      const suffix = jest.fn(() => <span>Suffix</span>);
      render(<Autocomplete options={simpleOptions} value="a" prefix={prefix} suffix={suffix} />);
      expect(screen.getByText('Prefix')).toBeInTheDocument();
      expect(screen.getByText('Suffix')).toBeInTheDocument();
    });

    test('BR-06: Renders with empty', async () => {
      render(<Autocomplete options={[]} value={null}/>);
      await userEvent.click(screen.getByRole('button', {name: /Toggle options/ }));
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    test('BR-07: Renders with null, or undefined options', async () => {
      render(<Autocomplete options={null as any} value={null}/>);
      await userEvent.click(screen.getByRole('button', {name: /Toggle options/ }));
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  describe('2. Popover & User Interaction', () => {
    test('UI-01 & UI-05: Toggles popover on button click and closes on outside click', async () => {
      render(<div><button>Outside</button><Autocomplete options={simpleOptions} value={null} /></div>);
      const triggerButton = screen.getByRole('button', { name: /Toggle options/ });

      expect(screen.queryByText('Apple')).not.toBeInTheDocument();

      await userEvent.click(triggerButton);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      
      await userEvent.click(screen.getByText('Outside'));
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  describe('3. Single-Select Mode (multiple={false})', () => {
    test('SS-01 & UI-02: Selects an option and closes popover', async () => {
      const onChange = jest.fn();
      render(<Autocomplete options={simpleOptions} onChange={onChange} value={null} />);
      await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
      
      await userEvent.click(screen.getByText('Banana'));
      
      expect(onChange).toHaveBeenCalledWith('b');
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });

    test('SS-02: Changes a selection', async () => {
      const onChange = jest.fn();
      render(<Autocomplete options={simpleOptions} onChange={onChange} value="a" />);
      await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

      await userEvent.click(screen.getByText('Cherry'));
      expect(onChange).toHaveBeenCalledWith('c');
    });

    test('SS-03: Clears selection from search input', async () => {
      const onChange = jest.fn();
      render(<Autocomplete options={simpleOptions} onChange={onChange} value="a" />);
      await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

      await userEvent.click(screen.getByRole('button', {name: "Clear"}));
      expect(screen.getByTestId('autocomplete')).toHaveValue('');
    });
  });
  
  describe('4. Multi-Select Mode (multiple={true})', () => {
    test('MS-01 & UI-03: Selects multiple options and popover stays open', async () => {
        const onChange = jest.fn();
        render(<Autocomplete options={simpleOptions} onChange={onChange} multiple value={[]} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        await userEvent.click(screen.getByText('Apple'));
        expect(onChange).toHaveBeenLastCalledWith(['a']);
        expect(screen.getByText('Apple')).toBeInTheDocument();

        await userEvent.click(screen.getByText('Cherry'));
        expect(onChange).toHaveBeenLastCalledWith(['c']);
    });

     test('MS-02: Deselects an option', async () => {
        const onChange = jest.fn();
        render(<Autocomplete options={simpleOptions} onChange={onChange} multiple value={['a', 'c']} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        await userEvent.click(screen.getByText('Apple'));
        expect(onChange).toHaveBeenCalledWith(['c']);
     });

     test('MS-03 & MS-04: Uses "Select All" and "Clear All" from footer', async () => {
        const onChange = jest.fn();
        const { rerender } = render(<MemoryRouter><Autocomplete options={simpleOptions} onChange={onChange} multiple showFooter value={[]} /></MemoryRouter>);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        await userEvent.click(screen.getByRole('button', { name: 'Select All' }));
        expect(onChange).toHaveBeenCalledWith(['a', 'b', 'c']);

        rerender(<MemoryRouter><Autocomplete options={simpleOptions} onChange={onChange} multiple showFooter value={['a','b','c']} /></MemoryRouter>);
        await userEvent.click(screen.getByRole('button', { name: 'Clear All' }));
        expect(onChange).toHaveBeenLastCalledWith([]);
     });
     
     test('MS-05: Clears all from search input', async () => {
        const onChange = jest.fn();
        render(<Autocomplete options={simpleOptions} onChange={onChange} multiple value={['a', 'b']} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        await userEvent.click(screen.getByRole('button', {name: "Clear"}));
        expect(onChange).toHaveBeenCalledWith([]);
     });
  });

  describe('5. Search & Filtering', () => {
    test('SF-01, SF-02, SF-03: Filters options by label/value (case-insensitive)', async () => {
        render(<Autocomplete options={[{label: 'Apple Pie', value: 'fruit_1'}]} value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
        
        const searchInput = screen.getByPlaceholderText('Search');
        await user.type(searchInput, 'PIE');
        expect(screen.getByText('Apple Pie')).toBeInTheDocument();

        user.clear(searchInput);
        user.type(searchInput, 'fruit');
        expect(screen.getByText('Apple Pie')).toBeInTheDocument();
    });

    test('SF-04: Shows "No results found" message', async () => {
        render(<Autocomplete options={simpleOptions} value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
        await user.type(screen.getByPlaceholderText('Search'), 'xyz');
        expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    test('SF-05: Hides search input when hideSearch is true', async () => {
        render(<Autocomplete options={simpleOptions} hideSearch value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
        expect(screen.queryByPlaceholderText('Search')).not.toBeInTheDocument();
    });
  });
  
  describe('6. Data Handling & Grouping', () => {
    test('DH-01: Handles simple array of strings', async () => {
        const onChange = jest.fn();
        render(<Autocomplete options={['Apple', 'Banana']} onChange={onChange} value={null}/>);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
        
        await userEvent.click(screen.getByText('Apple'));
        expect(onChange).toHaveBeenCalledWith('Apple');
    });

    test('DH-02, DH-03, DH-04: Renders and filters grouped options correctly', async () => {
        render(<Autocomplete options={groupedOptions} value={null}/>);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.queryByText('Hidden Label Group')).not.toBeInTheDocument();
        expect(screen.getByText('Hidden')).toBeInTheDocument();

        await user.type(screen.getByPlaceholderText('Search'), 'carr');
        expect(screen.queryByText('Fruits')).not.toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
    });
  });

  describe('7. Advanced Props & Edge Cases', () => {
    test('AP-01: Displays loading indicator when loading is true', async () => {
        render(<Autocomplete options={[]} loading value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
        expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    });
    
    test('AP-02: Disabled options are not selectable', async () => {
        const onChange = jest.fn();
        const opts = [...simpleOptions, {label: 'Disabled', value: 'd', disabled: true }];
        render(<Autocomplete options={opts} onChange={onChange} value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));
        
        const disabledOption = screen.getByText('Disabled');
        expect(disabledOption.parentElement?.parentElement).toHaveAttribute('aria-disabled', 'true');
        
        await userEvent.click(disabledOption);
        expect(onChange).not.toHaveBeenCalled();
    });

    test('AP-03: `maxOptions` limits visible items per group', async () => {
        render(<Autocomplete options={simpleOptions} maxOptions={2} value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
        expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
    });

    test('AP-04: `itemPrefix` and `itemSuffix` render content', async () => {
        const itemPrefix = jest.fn(() => <span data-testid="item-prefix">P</span>);
        const itemSuffix = jest.fn(() => <span data-testid="item-suffix">S</span>);
        render(<Autocomplete options={simpleOptions} itemPrefix={itemPrefix} itemSuffix={itemSuffix} value={null} />);
        await userEvent.click(screen.getByRole('button', {name: "Toggle options"}));

        expect(screen.getAllByTestId('item-prefix').length).toBe(3);
        expect(screen.getAllByTestId('item-suffix').length).toBe(3);
    });
  });
});
