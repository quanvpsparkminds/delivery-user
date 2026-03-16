import { TTranslations } from "./EN";

export const vi: TTranslations = {
  common: {
    hi: "Xin chào",
    save: "Lưu",
    continue: "Tiếp tục",
    signIn: "Đăng nhập",
    signOut: "Đăng xuất",
    ok: "Đồng ý",
    cancel: "Hủy",
    openSettings: "Mở cài đặt",
    today: "Hôm nay",
    yesterday: "Hôm qua",
    add: "Thêm",
    checkout: "Thanh toán",
  },
  screen: {
    signIn: "Đăng nhập",
  },
  biometric: {
    FaceID: {
      title: "Bảo vệ tài khoản của bạn\nvới Face ID",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Face ID",
    },
    TouchID: {
      title: "Bảo vệ tài khoản của bạn\nvới Touch ID",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Touch ID",
    },
    Biometrics: {
      title: "Bảo vệ tài khoản của bạn\nvới Xác thực Vân tay",
      message:
        "Đây là cách chúng tôi đảm bảo rằng chỉ có bạn\nmới có thể truy cập vào ví của mình.",
      enableBTN: "Kích hoạt Vân tay",
    },
    promtMessage: "Xác nhận vân tay của bạn",
    cancelButtonText: "Hủy",
  },
  input: {
    email: {
      label: "Email",
      placeholder: "Nhập email của bạn",
    },
    password: {
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
    },
    phone: { label: "Số điện thoại", placeholder: "Nhập số điện thoại" },
    firstName: { label: "Tên", placeholder: "Nhập tên" },
    lastName: { label: "Họ", placeholder: "Nhập họ" },
    fullName: {
      label: "Họ và tên",
      placeholder: "Nhập họ và tên của bạn",
    },
  },
  errorMessage: {
    input: {
      compare: "{{input}} phải khớp",
      required: "Vui lòng nhập {{input}}.",
      incorrect: "Vui lòng đảm bảo bạn đã nhập thông tin chính xác.",
      invalid: "{{input}} không hợp lệ.",
      mesExtensionOne: "Vui lòng chỉ tải lên định dạng pdf, png, jpg, jpeg",
      bankAccountNumber: "Số tài khoản phải có từ 10 đến 15 chữ số.",
      email: "Vui lòng nhập địa chỉ email hợp lệ",
      dob: "Bạn phải ít nhất 18 tuổi để sử dụng ứng dụng này.",
      password: {
        uppercase: "Mật khẩu phải chứa ít nhất một chữ cái viết hoa.",
        lowercase: "Mật khẩu phải chứa ít nhất một chữ cái viết thường.",
        number: "Mật khẩu phải chứa ít nhất một chữ số.",
        mismatch: "Mật khẩu không khớp.",
      },
      incorrectEmail: "Vui lòng nhập đúng định dạng email",
      maxImage: "Vui lòng tải file nhỏ hơn hoặc bằng 5MB",
    },
    minLength: "Vui lòng nhập ít nhất {{length}} ký tự",
    maxLength: "Vui lòng không nhập quá {{length}} ký tự",
  },
  appTab: {
    DELIVERY: "Giao hàng",
    PICK_UP: "Đến lấy",
    DINE_IN: "Tại quán",
  },
  tabs: {
    restaurant: "Nhà hàng",
    grocery: "Cửa hàng",
    shopping: "Mua sắm",
    search: "Tìm kiếm",
    account: "Tài khoản",
  },
  signIn: {
    title: {
      SIGN_IN: "Đăng nhập",
      SIGN_UP: "Đăng ký",
    },
    sub: `Đăng ký hoặc đăng nhập để khám phá\nứng dụng của chúng tôi`,
    tabs: {
      SIGN_IN: "Đăng nhập",
      SIGN_UP: "Đăng ký",
    },
    loginWith: "Hoặc đăng nhập với",
    forgot: "Quên mật khẩu?",
  },
  home: {
    search: "Thức ăn, nhu yếu phẩm, đồ uống, v.v.",
    topRate: "Nhà hàng được đánh giá cao",
    rating: "{{rate}} Đánh giá",
    menu: {
      seller: "Bán chạy nhất",
      promo: "Ưu đãi",
      meal: "Combo",
      nearby: "Gần đây",
    },
  },
  shopping: {
    near: "Cửa hàng gần bạn",
  },
  store: {
    delivery: "Giao hàng",
    arrive: "Đến nơi {{minutes}}phút ({{about}} mi)",
  },
};
