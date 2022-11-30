import { useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "./errorSlice";

/**
 * Displays a toast notification anytime an error is thrown.
 */
export const useErrorHandler = () => {
  const toastRef = useRef(null);
  const dispatch = useDispatch();

  const errorMessage = useSelector((state) => state.error.errorMessage);

  const toastId = "toast-error";

  const toastOptions = useMemo(
    () => ({
      autoClose: 5000,
      type: toast.TYPE.ERROR,
      toastId: toastId,
    }),
    []
  );

  const notify = useCallback(
    (message) => {
      toastRef.current = toast(message, toastOptions);
    },
    [toastOptions]
  );

  useEffect(() => {
    if (errorMessage) {
      notify(errorMessage);
      dispatch(clearError());
    }
  }, [errorMessage, dispatch, notify]);
};
