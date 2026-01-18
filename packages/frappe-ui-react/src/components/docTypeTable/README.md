# DocTypeTable Component

## Overview

The `DocTypeTable` component is a general-purpose React component for displaying a table of Frappe documents. It combines the `useFrappeGetDocList` hook with the ListView component to provide a seamless integration with your Frappe backend.

## Features

- ✅ **Automatic Data Fetching**: Fetches data from Frappe using `useFrappeGetDocList` hook
- ✅ **Configurable Columns**: Define custom columns with labels, keys, and widths
- ✅ **Flexible Filtering**: Support for Frappe document filtering
- ✅ **Ordering**: Sort documents by any field
- ✅ **Pagination**: Built-in limit and offset support
- ✅ **Selection**: Optional row selection with banner
- ✅ **Loading States**: Show loading indicator while fetching
- ✅ **Error Handling**: Display errors with retry capability
- ✅ **Customizable UI**: Custom loading, empty, and error components
- ✅ **Callbacks**: Hooks for data load and error events

## Installation

The component is exported from the main package:

```tsx
import { DocTypeTable } from '@rtcamp/frappe-ui-react';
```

## Basic Usage

```tsx
import { DocTypeTable } from '@rtcamp/frappe-ui-react';

function MyApp() {
  const columns = [
    {
      label: 'Name',
      key: 'name',
      width: 3,
    },
    {
      label: 'Email',
      key: 'email',
      width: '200px',
    },
  ];

  return (
    <DocTypeTable
      doctype="User"
      columns={columns}
      rowKey="name"
    />
  );
}
```

## Props

### DocTypeTableProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `doctype` | `string` | **required** | The Frappe DocType name (e.g., 'User', 'Employee') |
| `columns` | `any[]` | **required** | Column configuration array |
| `rowKey` | `string` | `'name'` | The unique key field for each row |
| `params` | `FrappeGetDocListParams` | `{}` | Parameters for useFrappeGetDocList (fields, filters, etc.) |
| `options` | `ListOptionsProps` | - | ListView options for customization |
| `auto` | `boolean` | `true` | Auto-fetch data on component mount |
| `loadingComponent` | `ReactNode` | - | Custom loading indicator |
| `emptyComponent` | `ReactNode` | - | Custom empty state component |
| `errorComponent` | `ReactNode \| Function` | - | Custom error component |
| `onDataLoad` | `(data: any[]) => void` | - | Callback when data is loaded |
| `onError` | `(error: any) => void` | - | Callback when error occurs |

### FrappeGetDocListParams

Parameters passed to the API call:

| Param | Type | Description |
|-------|------|-------------|
| `doctype` | `string` | The DocType name (set automatically) |
| `fields` | `string[]` | Fields to retrieve from the server |
| `filters` | `Record<string, any>` | Filters for the query |
| `orderBy` | `string` | Order by clause (e.g., `` `tabUser`.`name` asc ``) |
| `limit` | `number` | Number of records to fetch |
| `offset` | `number` | Offset for pagination |
| `pageLength` | `number` | Alias for limit |
| `pageSize` | `number` | Alias for limit |

## Advanced Usage

### With Filters

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  params={{
    fields: ['name', 'email', 'user_type', 'enabled'],
    filters: { enabled: 1 },
    limit: 20,
  }}
/>
```

### With Ordering

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  params={{
    fields: ['name', 'email', 'user_type'],
    orderBy: '`tabUser`.`name` asc',
    limit: 50,
  }}
/>
```

### With Pagination

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  params={{
    fields: ['name', 'email'],
    limit: 10,
    offset: 0, // Skip first 0 records (page 1)
  }}
/>
```

### Without Row Selection

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  options={{
    options: {
      selectable: false,
    },
  }}
/>
```

### Custom Loading Component

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  loadingComponent={<div>Loading users...</div>}
/>
```

### Custom Empty State

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  emptyComponent={<div>No users found</div>}
/>
```

### Custom Error Component

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  errorComponent={(error) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  )}
/>
```

### Manual Data Fetching

```tsx
function MyApp() {
  const { data, loading, error, fetch } = useFrappeGetDocList(
    {
      doctype: 'User',
      fields: ['name', 'email'],
    },
    false // Don't auto-fetch
  );

  return (
    <div>
      <button onClick={() => fetch()}>Load Users</button>
      <DocTypeTable
        doctype="User"
        columns={columns}
        auto={false}
      />
    </div>
  );
}
```

### With Callbacks

```tsx
<DocTypeTable
  doctype="User"
  columns={columns}
  onDataLoad={(data) => {
    console.log('Data loaded:', data);
  }}
  onError={(error) => {
    console.error('Error loading data:', error);
  }}
/>
```

## Column Configuration

Each column in the columns array should have the following structure:

```tsx
{
  label: string;           // Display label for the column header
  key: string;             // Data key from the document
  width?: string | number; // Column width (e.g., '200px', 3)
  getLabel?: (props: { row: any }) => ReactNode;  // Custom label renderer
  prefix?: (props: { row: any }) => ReactNode;    // Prefix element before the value
  suffix?: (props: { row: any }) => ReactNode;    // Suffix element after the value
}
```

## useFrappeGetDocList Hook

The hook can also be used independently:

```tsx
import { useFrappeGetDocList } from '@rtcamp/frappe-ui-react';

function MyComponent() {
  const { data, loading, error, fetch } = useFrappeGetDocList({
    doctype: 'User',
    fields: ['name', 'email'],
    filters: { enabled: 1 },
    limit: 20,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.data?.map((user) => (
        <div key={user.name}>{user.name}</div>
      ))}
    </div>
  );
}
```

## Requirements

- Frappe backend with REST API enabled
- Valid Frappe CSRF token available as `window.csrf_token`
- Proper CORS headers if using from a different domain

## Error Handling

The component provides built-in error handling with a retry button. You can also:

1. Provide a custom error component
2. Use the `onError` callback
3. Access the error state through the hook directly

## Performance Considerations

- Use `fields` parameter to fetch only required fields
- Use `limit` parameter to paginate large datasets
- Use `filters` to reduce the dataset on the server side
- Consider using `auto={false}` for conditional fetching

## Browser Compatibility

Works in all modern browsers that support:
- ES2015+
- React 19+
- Fetch API

## Related Components

- `ListView` - Base table component
- `ListHeader` - Table header
- `ListRows` - Table rows
- `ListRow` - Single row
- `ListRowItem` - Row item/cell

## Examples

See the Storybook stories in `docTypeTable.stories.tsx` for more detailed examples and use cases.
