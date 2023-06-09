import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

const useAlert = () => {
  const show = async (
    promiseFunction: any,
    loadingMessage: string,
    successMessage: string
  ) => {
    const response = await toast.promise(promiseFunction, {
      pending: loadingMessage,
      success: successMessage,
      error: {
        render({ data }: any) {
          return data.message;
        },
      },
    });

    return response;
  };

  const showError = (message:string) => {
    toast.error(message);
  }

  return { show,showError };
};

export default useAlert;
