import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./index";

export default {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
} as Meta<typeof Table>;

const Template: StoryObj = {
  render: () => (
    <div className="p-4 w-full max-w-2xl">
      <Table>
        <TableCaption>Sample Table Caption</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Jane Doe</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>John Smith</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Inactive</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Footer: 2 users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const Basic = { ...Template };

export const Advanced = {
  render: () => (
    <div className="p-4 w-full max-w-2xl">
      <Table>
        <TableCaption>Team Members & Status</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 border-b-2 border-blue-400">
              Avatar
            </TableHead>
            <TableHead className="border-b-2 border-blue-400">Name</TableHead>
            <TableHead className="border-b-2 border-blue-400">Email</TableHead>
            <TableHead className="border-b-2 border-blue-400">Status</TableHead>
            <TableHead className="border-b-2 border-blue-400">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="odd:bg-slate-100 even:bg-white border-b border-slate-300">
            <TableCell className="border-r border-slate-300">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Jane"
                className="w-8 h-8 rounded-full"
              />
            </TableCell>
            <TableCell className="border-r border-slate-300">
              Jane Doe
            </TableCell>
            <TableCell className="border-r border-slate-300">
              jane@example.com
            </TableCell>
            <TableCell className="border-r border-slate-300">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">
                Active
              </span>
            </TableCell>
            <TableCell>Developer</TableCell>
          </TableRow>
          <TableRow className="odd:bg-slate-100 even:bg-white border-b border-slate-300">
            <TableCell className="border-r border-slate-300">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="John"
                className="w-8 h-8 rounded-full"
              />
            </TableCell>
            <TableCell className="border-r border-slate-300">
              John Smith
            </TableCell>
            <TableCell className="border-r border-slate-300">
              john@example.com
            </TableCell>
            <TableCell className="border-r border-slate-300">
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">
                Pending
              </span>
            </TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
          <TableRow className="odd:bg-slate-100 even:bg-white border-b border-slate-300">
            <TableCell className="border-r border-slate-300">
              <img
                src="https://randomuser.me/api/portraits/men/65.jpg"
                alt="Alex"
                className="w-8 h-8 rounded-full"
              />
            </TableCell>
            <TableCell className="border-r border-slate-300">
              Alex Lee
            </TableCell>
            <TableCell className="border-r border-slate-300">
              alex@example.com
            </TableCell>
            <TableCell className="border-r border-slate-300">
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                Inactive
              </span>
            </TableCell>
            <TableCell>Manager</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-right border-t-2 border-blue-400"
            >
              Footer: 3 team members
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};
