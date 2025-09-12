import { useToasts } from "./useToast";
import ToastProvider from "./toastProvider";
import { Button } from "../button";
import { MemoryRouter } from "react-router";
import { Meta } from "@storybook/react-vite/*";

export default {
  title: "Components/Toast",
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
} as Meta<typeof ToastProvider>;

const ToastTriggerComponent = () => {
  const toast = useToasts();

  const handlePromise = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve("Operation completed successfully!");
        } else {
          reject(new Error("Something went wrong."));
        }
      }, 2000);
    });

    toast.promise(promise, {
      loading: "Performing operation...",
      success: (data) => data as string,
      error: (err) => err.message,
      duration: 3,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <MemoryRouter>
        <Button onClick={() => toast.success("This is a success message!")}>
          Show Success Toast
        </Button>
        <Button onClick={() => toast.error("This is an error message!")}>
          Show Error Toast
        </Button>
        <Button onClick={handlePromise}>Show Promise Toast</Button>
      </MemoryRouter>
    </div>
  );
};

export const Default = () => <ToastTriggerComponent />;
