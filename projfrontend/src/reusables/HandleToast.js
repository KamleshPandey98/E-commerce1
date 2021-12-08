import { toast } from "react-toastify";

export const handleToast = (boolsuccess, errMsg, errorType) => {
  //   toast.dismiss();
  switch (true) {
    case toast.TYPE.ERROR === errorType:
      showErrorToast(boolsuccess, errMsg);
      break;
    case toast.TYPE.SUCCESS === errorType:
      showSuccessToast(boolsuccess, errMsg);
      break;
    case toast.TYPE.WARNING === errorType:
      showWarningToast(boolsuccess, errMsg);
      break;

    default:
      break;
  }
};

const showErrorToast = (boolSuccess, errMsg) => {
  toast.error(errMsg);
};

const showSuccessToast = (boolSuccess, errMsg) => {
  toast.success(errMsg);
};

const showWarningToast = (boolSuccess, errMsg) => {
  toast.warning(errMsg);
};

// class ToastTypes {
//   static warning= "warning";
// }
