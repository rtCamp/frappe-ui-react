import "@testing-library/jest-dom";
import { screen, renderHook, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ToastProvider from "../toastProvider";
import { useToasts } from "../useToast";

const renderToastHook = () => {
  return renderHook(() => useToasts(), {
    wrapper: ToastProvider,
  });
};

describe("Toast", () => {
  describe("Basic Toast Types", () => {
    it("renders success toast with message", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.success("Operation successful");
      });

      expect(
        await screen.findByText("Operation successful")
      ).toBeInTheDocument();
    });

    it("renders error toast with message", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.error("Operation failed");
      });

      expect(await screen.findByText("Operation failed")).toBeInTheDocument();
    });

    it("renders info toast with message", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.info("Here is some information");
      });

      expect(
        await screen.findByText("Here is some information")
      ).toBeInTheDocument();
    });

    it("renders warning toast with message", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.warning("This is a warning");
      });

      expect(await screen.findByText("This is a warning")).toBeInTheDocument();
    });

    it("renders multiple toasts simultaneously", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.success("Success message");
        result.current.error("Error message");
        result.current.info("Info message");
        result.current.warning("Warning message");
      });

      expect(await screen.findByText("Success message")).toBeInTheDocument();
      expect(screen.getByText("Error message")).toBeInTheDocument();
      expect(screen.getByText("Info message")).toBeInTheDocument();
      expect(screen.getByText("Warning message")).toBeInTheDocument();
    });
  });

  describe("Toast create method", () => {
    it("creates toast using create method with type", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.create({
          message: "Custom toast message",
          type: "success",
        });
      });

      expect(
        await screen.findByText("Custom toast message")
      ).toBeInTheDocument();
    });

    it("creates toast with custom id", async () => {
      const { result } = renderToastHook();

      let toastId = "";
      act(() => {
        toastId = result.current.create({
          message: "Toast with custom ID",
          type: "info",
          id: "custom-toast-id",
        });
      });

      expect(
        await screen.findByText("Toast with custom ID")
      ).toBeInTheDocument();
      expect(toastId).toBe("custom-toast-id");
    });

    it("returns a toast id when creating a toast", async () => {
      const { result } = renderToastHook();

      let toastId = "";

      act(() => {
        toastId = result.current.success("Test toast");
      });

      expect(toastId).toBeDefined();
      expect(typeof toastId).toBe("string");
    });
  });

  describe("Toast removal", () => {
    it("removes a specific toast by id", async () => {
      const { result } = renderToastHook();

      let toastId = "";

      act(() => {
        toastId = result.current.success("Toast to be removed");
      });

      expect(
        await screen.findByText("Toast to be removed")
      ).toBeInTheDocument();

      act(() => {
        result.current.remove(toastId);
      });

      await waitFor(() => {
        expect(
          screen.queryByText("Toast to be removed")
        ).not.toBeInTheDocument();
      });
    });

    it("removes all toasts with removeAll", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.success("First toast");
        result.current.error("Second toast");
        result.current.info("Third toast");
      });

      expect(await screen.findByText("First toast")).toBeInTheDocument();
      expect(screen.getByText("Second toast")).toBeInTheDocument();
      expect(screen.getByText("Third toast")).toBeInTheDocument();

      act(() => {
        result.current.removeAll();
      });

      await waitFor(() => {
        expect(screen.queryByText("First toast")).not.toBeInTheDocument();
        expect(screen.queryByText("Second toast")).not.toBeInTheDocument();
        expect(screen.queryByText("Third toast")).not.toBeInTheDocument();
      });
    });
  });

  describe("Toast with action", () => {
    it("renders toast with action button", async () => {
      const { result } = renderToastHook();

      const onClickMock = jest.fn();

      act(() => {
        result.current.create({
          message: "Toast with action",
          type: "info",
          action: {
            label: "Undo",
            onClick: onClickMock,
          },
        });
      });

      expect(await screen.findByText("Toast with action")).toBeInTheDocument();
      expect(screen.getByText("Undo")).toBeInTheDocument();
    });

    it("calls action onClick when action button is clicked", async () => {
      const user = userEvent.setup();
      const { result } = renderToastHook();

      const onClickMock = jest.fn();

      act(() => {
        result.current.create({
          message: "Toast with clickable action",
          type: "info",
          action: {
            label: "Click me",
            onClick: onClickMock,
          },
        });
      });

      const actionButton = await screen.findByText("Click me");
      await user.click(actionButton);

      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Toast closable option", () => {
    it("renders close button when closable is true (default)", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.success("Closable toast");
      });

      expect(await screen.findByText("Closable toast")).toBeInTheDocument();
      expect(screen.getByLabelText("Close")).toBeInTheDocument();
    });

    it("does not render close button when closable is false", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.create({
          message: "Non-closable toast",
          type: "info",
          closable: false,
        });
      });

      expect(await screen.findByText("Non-closable toast")).toBeInTheDocument();
      expect(screen.queryByLabelText("Close")).not.toBeInTheDocument();
    });

    it("closes toast when close button is clicked", async () => {
      const user = userEvent.setup();
      const { result } = renderToastHook();

      act(() => {
        result.current.success("Toast to close");
      });

      expect(await screen.findByText("Toast to close")).toBeInTheDocument();

      const closeButton = screen.getByLabelText("Close");
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText("Toast to close")).not.toBeInTheDocument();
      });
    });
  });

  describe("Toast promise", () => {
    it("shows loading state while promise is pending", async () => {
      const { result } = renderToastHook();

      const promise = new Promise((resolve) => {
        setTimeout(() => resolve("Success!"), 100);
      });

      act(() => {
        result.current.promise(promise, {
          loading: "Loading...",
          success: "Done!",
          error: "Failed!",
        });
      });

      expect(await screen.findByText("Loading...")).toBeInTheDocument();
    });

    it("shows success message when promise resolves", async () => {
      const { result } = renderToastHook();

      const promise = Promise.resolve("Success data");

      act(() => {
        result.current.promise(promise, {
          loading: "Loading...",
          success: "Operation completed!",
          error: "Failed!",
        });
      });

      expect(
        await screen.findByText("Operation completed!")
      ).toBeInTheDocument();
    });

    it("shows success message from function when promise resolves", async () => {
      const { result } = renderToastHook();

      const promise = Promise.resolve({ name: "John" });

      await act(async () => {
        await result.current.promise(promise, {
          loading: "Loading...",
          success: (data) => `Hello, ${data.name}!`,
          error: "Failed!",
        });
      });

      expect(await screen.findByText("Hello, John!")).toBeInTheDocument();
    });

    it("shows error message when promise rejects", async () => {
      const { result } = renderToastHook();

      const promise = Promise.reject(new Error("Something went wrong"));

      act(() => {
        result.current
          .promise(promise, {
            loading: "Loading...",
            success: "Done!",
            error: "Operation failed!",
          })
          .catch(() => {}); // Catch to avoid unhandled rejection in test
      });

      expect(await screen.findByText("Operation failed!")).toBeInTheDocument();
    });

    it("shows error message from function when promise rejects", async () => {
      const { result } = renderToastHook();

      const promise = Promise.reject(new Error("Custom error message"));

      act(() => {
        result.current
          .promise(promise, {
            loading: "Loading...",
            success: "Done!",
            error: (err) => `Error: ${err.message}`,
          })
          .catch(() => {}); // Catch to avoid unhandled rejection in test
      });

      expect(
        await screen.findByText("Error: Custom error message")
      ).toBeInTheDocument();
    });
  });

  describe("useToasts hook", () => {
    it("throws error when used outside ToastProvider", () => {
      const consoleError = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        renderHook(() => useToasts());
      }).toThrow("useToasts must be used within a ToastsProvider");

      consoleError.mockRestore();
    });
  });

  describe("Toast HTML sanitization", () => {
    it("renders allowed HTML tags in message", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.create({
          message: "This is <strong>important</strong> and <em>urgent</em>",
          type: "info",
        });
      });

      expect(await screen.findByText("important")).toBe("STRONG");
      expect(screen.getByText("urgent")).toBe("EM");
    });

    it("renders link tags in message", async () => {
      const { result } = renderToastHook();

      act(() => {
        result.current.create({
          message: 'Click <a href="https://example.com">here</a> for more info',
          type: "info",
        });
      });

      const linkElement = await screen.findByText("here");
      expect(linkElement.tagName).toBe("A");
      expect(linkElement).toHaveAttribute("href", "https://example.com");
    });
  });
});
