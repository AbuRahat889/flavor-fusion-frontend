// utils/handleApiResponse.ts

import { toast } from "sonner";

export const handleApiResponse = async <T>(
  apiFn: (data: T) => Promise<any>,
  data: T,
  successMessage = "Operation successful!",
  showSuccessToast = true,
) => {
  try {
    const res = await apiFn(data);

    if (res?.data?.success) {
      if (showSuccessToast) {
        toast.success(res?.data?.message || successMessage);
      }
      return { success: true, data: res.data };
    } else {
      const errorMessage =
        (res?.error &&
          "data" in res.error &&
          (res.error.data as any)?.message) ||
        (res?.error && "message" in res.error && (res.error as any).message) ||
        "An error occurred";

      if (showSuccessToast) {
        toast.error(errorMessage);
      }

      return { success: false, error: errorMessage };
    }
  } catch (error: any) {
    const fallbackError =
      error?.message || "Something went wrong. Please try again.";

    toast.error(fallbackError);

    return { success: false, error: fallbackError };
  }
};
