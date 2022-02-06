"use strict";

var url = 'https://vue3-course-api.hexschool.io/v2';
var path = 'erinhuang-lab';
"use strict";

// 串接登入 API
var loginApp = Vue.createApp({
  data: function data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login: function login() {
      axios.post("".concat(url, "/admin/signin"), this.user).then(function (res) {
        // 將 token 存在 cookie
        var _res$data = res.data,
            token = _res$data.token,
            expired = _res$data.expired;
        document.cookie = "userToken=".concat(token, "; expires=").concat(new Date(expired), "GMT;"); // 跳轉頁面

        window.alert("".concat(res.data.message, "\uFF0C\u5373\u5C07\u9032\u5165\u5546\u54C1\u9801\u9762"));
        window.location.href = 'update-product.html';
      })["catch"](function (error) {
        window.alert("\u767B\u5165\u5931\u6557\uFF0C\u8ACB\u91CD\u65B0\u8F38\u5165\u4E00\u6B21");
        console.dir(error);
      });
    }
  }
});
loginApp.mount('#loginApp');
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateModal = {};
var deleteModal = {};
var updateApp = Vue.createApp({
  data: function data() {
    return {
      user: {
        username: '',
        password: ''
      },
      products: [],
      tempProduct: {
        imagesUrl: []
      },
      isNew: false
    };
  },
  methods: {
    checkLogin: function checkLogin() {
      var _this = this;

      axios.post("".concat(url, "/api/user/check")).then(function (res) {
        _this.getProducts();
      })["catch"](function (error) {
        window.alert("\u9A57\u8B49\u5931\u6557\uFF0C\u8ACB\u91CD\u65B0\u767B\u5165");
        window.location.href = 'index.html';
      });
    },
    getProducts: function getProducts() {
      var _this2 = this;

      axios.get("".concat(url, "/api/").concat(path, "/admin/products")).then(function (res) {
        _this2.products = res.data.products;
      })["catch"](function (error) {
        window.alert('error');
      });
    },
    openModal: function openModal(status, product) {
      // 新增、編輯共用的判斷
      if (status === 'isNew') {
        this.tempProduct = {
          imagesUrl: []
        };
        updateModal.show();
        this.isNew = true;
      } else if (status === 'edit') {
        this.tempProduct = _objectSpread({}, product);
        updateModal.show(); // 刪除的判斷        
      } else if (status === 'delete') {
        this.tempProduct = _objectSpread({}, product);
        deleteModal.show();
      }
    },
    updateProduct: function updateProduct() {
      var _this3 = this;

      var newUrl = "".concat(url, "/api/").concat(path, "/admin/product");
      var method = 'post'; // 如果是編輯模式，api位址和介接方法變動為

      if (!this.isNew) {
        newUrl = "".concat(url, "/api/").concat(path, "/admin/product/").concat(this.tempProduct.id);
        method = 'put';
      }

      axios[method](newUrl, {
        data: this.tempProduct
      }).then(function (res) {
        _this3.getProducts();

        updateModal.hide();
      })["catch"](function (error) {
        console.dir(error);
      });
    },
    deleteProduct: function deleteProduct() {
      var _this4 = this;

      var newUrl = "".concat(url, "/api/").concat(path, "/admin/product/").concat(this.tempProduct.id);
      axios["delete"](newUrl, {
        data: this.tempProduct
      }).then(function (res) {
        deleteModal.hide();

        _this4.getProducts();
      })["catch"](function (error) {
        console.dir(error);
      });
    }
  },
  mounted: function mounted() {
    var token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common['Authorization'] = token;
    this.checkLogin();
    updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  }
});
updateApp.mount('#updateApp');
//# sourceMappingURL=all.js.map
