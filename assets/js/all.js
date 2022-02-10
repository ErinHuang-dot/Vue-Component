"use strict";

var url = 'https://vue3-course-api.hexschool.io/v2';
var path = 'erinhuang-lab';
"use strict";

var deletemodal = {
  props: ['tempProduct'],
  methods: {
    deleteProduct: function deleteProduct() {
      var _this = this;

      var newUrl = "".concat(url, "/api/").concat(path, "/admin/product/").concat(this.tempProduct.id);
      axios["delete"](newUrl, {
        data: this.tempProduct
      }).then(function (res) {
        deleteModal.hide();

        _this.$emit('get-products');
      })["catch"](function (error) {
        console.dir(error);
      });
    }
  },
  template: "<div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header bg-danger text-white\">\n            <h5 class=\"modal-title\" id=\"deleteModalLabel\">\u522A\u9664\u7522\u54C1</h5>\n        </div>\n        <div class=\"modal-body\">\n            <p>\u662F\u5426\u522A\u9664 <span class=\"text-danger\">{{ tempProduct.title }}</span> \u5546\u54C1\uFF08\u522A\u9664\u5F8C\u5C07\u7121\u6CD5\u6062\u5FA9\uFF09\uFF1F</p> \n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">\u53D6\u6D88</button>\n            <button type=\"button\" class=\"btn btn-danger\" @click=\"deleteProduct\">\u78BA\u8A8D\u522A\u9664</button>\n        </div>\n        </div>\n    </div>"
};
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

var pagination = {
  props: ['pages'],
  template: "<nav aria-label=\"Page navigation example\">\n    <ul class=\"pagination\">\n        <li class=\"page-item\" :class=\"{disabled: !pages.has_pre}\">\n            <a class=\"page-link\" href=\"#\" aria-label=\"Previous\" @click=\"$emit('get-product', page = 1)\">\n                <span aria-hidden=\"true\">&laquo;</span>\n            </a>\n        </li>\n        <li class=\"page-item\" :class=\"{ active: page === pages.current_page}\" v-for=\"page in pages.total_pages\" :key=\"page\">\n            <a class=\"page-link\" href=\"#\" @click=\"$emit('get-product', page)\">{{ page }}</a>\n        </li>\n        <li class=\"page-item\" :class=\"{disabled: !pages.has_next}\">\n            <a class=\"page-link\" href=\"#\" aria-label=\"Next\" @click=\"$emit('get-product', page = pages.total_pages)\">\n                <span aria-hidden=\"true\">&raquo;</span>\n            </a>\n        </li>\n    </ul>\n  </nav>"
};
"use strict";

var starvalue = {
  props: ['list', 'starA', 'starB', 'starScore', 'tempProduct'],
  template: "<ul class=\"stars-wrap ps-0 mb-0 d-flex\">\n        <li v-for=\"(i, index) in list\" :key=\"index\" @click=\"$emit('click-stars', index)\">\n            <img class=\"star\" :src=\"starScore>index?starA:starB\"/>\n        </li>\n    </ul>"
};
"use strict";

var updatemodal = {
  data: function data() {
    return {
      list: [0, 1, 2, 3, 4],
      starA: '../assets/images/star-filled.svg',
      starB: '../assets/images/star-outlined.svg',
      starScore: 0
    };
  },
  props: ['tempProduct', 'isNew'],
  methods: {
    updateProduct: function updateProduct() {
      var _this = this;

      var newUrl = "".concat(url, "/api/").concat(path, "/admin/product");
      var method = 'post'; // 如果是編輯模式，api位址和介接方法變動為

      if (!this.isNew) {
        newUrl = "".concat(url, "/api/").concat(path, "/admin/product/").concat(this.tempProduct.id);
        method = 'put';
      }

      axios[method](newUrl, {
        data: this.tempProduct
      }).then(function (res) {
        _this.$emit('get-products');

        updateModal.hide();
      })["catch"](function (error) {
        console.dir(error);
      });
    },
    upload: function upload(event) {
      var _this2 = this;

      // 找到資料位置
      var file = event.target.files[0];
      console.log(file); // 上傳form的資料屬性

      var formData = new FormData(); // 將API<input name>欄位夾帶

      formData.append('file-to-upload', file);
      axios.post("".concat(url, "/api/").concat(path, "/admin/upload"), formData).then(function (res) {
        console.log(res);
        _this2.tempProduct.imageUrl = res.data.imageUrl;
      })["catch"](function (error) {
        console.log(error.response);
      });
    },
    clickStars: function clickStars(i) {
      this.starScore = i + 1;
    }
  },
  components: {
    starvalue: starvalue
  },
  template: "<div class=\"modal-dialog modal-xl\">\n        <div class=\"modal-content\">\n        <div class=\"modal-header bg-dark text-white\">\n            <h5 class=\"modal-title\" id=\"updateModalLabel\">\u65B0\u589E\u7522\u54C1</h5>\n        </div>\n        <div class=\"modal-body\">\n            <div class=\"row\">\n            <!-- modal-start -->\n            <div class=\"col-4\">\n                <div class=\"mb-5\">\n                    <label for=\"imgUrl\" class=\"form-label\">\u4E3B\u8981\u5716\u7247</label>\n                    <input type=\"file\" class=\"form-control mb-2\" id=\"imgFile\" @change=\"upload\">\n                    <p>\u6216</p>\n                    <input type=\"text\" class=\"form-control mb-2\" name=\"img-url\" id=\"imgUrl\" placeholder=\"\u8ACB\u8F38\u5165\u5716\u7247\u9023\u7D50\" v-model=\"tempProduct.imageUrl\">\n                    <img :src=\"tempProduct.imageUrl\" class=\"img-fluid\"> \n                </div>\n                <div>\n                <!-- \u591A\u5716\u65B0\u589E -->\n                <h3 class=\"mb-3\">\u591A\u5716\u65B0\u589E</h3>\n                <!-- \u5148\u5224\u65B7 tempProduct.imagesUrl \u662F\u5426\u70BA\u9663\u5217\u8CC7\u6599-->\n                <div v-if=\"Array.isArray(tempProduct.imagesUrl)\">\n                    <div v-for=\"(img, key) in tempProduct.imagesUrl\" :key=\"key + 12345\">\n                    <input type=\"text\" class=\"form-control mb-2\" name=\"img-url\" id=\"imgUrl\" placeholder=\"\u8ACB\u8F38\u5165\u5716\u7247\u9023\u7D50\" v-model=\"tempProduct.imagesUrl[key]\">\n                    <img :src=\"tempProduct.imagesUrl[key]\" class=\"img-fluid mb-2\">                             \n                    </div>\n                    <!-- \u65B0\u589E\u6309\u9215\u7684\u9032\u968E\u5224\u65B7\uFF1A1.\u9663\u5217\u70BA\u7A7A\u9663\u5217 2.\u9663\u5217\u6700\u5F8C\u4E00\u7B46\u8CC7\u6599\u6709\u5167\u5BB9 -->\n                    <button type=\"button\" class=\"btn btn-primary btn-sm w-100 mb-2\" \n                    v-if=\"!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]\" @click=\"tempProduct.imagesUrl.push('')\">\u65B0\u589E\u5716\u7247</button>\n                    <button type=\"button\" class=\"btn btn-outline-danger btn-sm w-100\" \n                    v-else @click=\"tempProduct.imagesUrl.pop()\">\u522A\u9664\u6700\u5F8C\u4E00\u7B46\u5716\u7247</button>\n                </div>\n                </div>\n            </div>\n            <!-- modal-end -->\n            <div class=\"col-8\">\n                <!-- modal-end-top -->\n                <div class=\"pb-4 border-bottom mb-3\">\n                <div class=\"mb-3\">\n                    <label for=\"productTitle\" class=\"form-label\">\u6A19\u984C</label>\n                    <input type=\"text\" class=\"form-control mb-2\" name=\"product-title\" \n                    id=\"productTitle\" placeholder=\"\u8ACB\u8F38\u5165\u6A19\u984C\" v-model=\"tempProduct.title\" autocomplete=\"on\">\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                    <div class=\"mb-3\">\n                        <label for=\"productCategory\" class=\"form-label\">\u5206\u985E</label>\n                        <input type=\"text\" class=\"form-control mb-2\" name=\"product-category\" \n                        id=\"productCategory\" placeholder=\"\u8ACB\u8F38\u5165\u5206\u985E\" v-model=\"tempProduct.category\" autocomplete=\"on\">\n                    </div>                      \n                    </div>\n                    <div class=\"col\">\n                    <div class=\"mb-3\">\n                        <label for=\"productUnit\" class=\"form-label\">\u55AE\u4F4D</label>\n                        <input type=\"text\" class=\"form-control mb-2\" name=\"product-unit\" \n                        id=\"productUnit\" placeholder=\"\u8ACB\u8F38\u5165\u55AE\u4F4D\" v-model=\"tempProduct.unit\" autocomplete=\"on\">\n                    </div> \n                    </div>\n                </div>\n                <div class=\"row\">\n                    <div class=\"col\">\n                    <div class=\"mb-3\">\n                        <label for=\"productPrice\" class=\"form-label\">\u539F\u50F9</label>\n                        <input type=\"text\" class=\"form-control mb-2\" name=\"product-price\" \n                        id=\"productPrice\" placeholder=\"\u8ACB\u8F38\u5165\u539F\u50F9\" v-model.number=\"tempProduct.origin_price\" autocomplete=\"on\">\n                    </div>                      \n                    </div>\n                    <div class=\"col\">\n                    <div class=\"mb-3\">\n                        <label for=\"productSalePrice\" class=\"form-label\">\u552E\u50F9</label>\n                        <input type=\"text\" class=\"form-control mb-2\" name=\"product-sale-price\" \n                        id=\"productSalePrice\" placeholder=\"\u8ACB\u8F38\u5165\u552E\u50F9\" v-model.number=\"tempProduct.price\" autocomplete=\"on\">\n                    </div> \n                    </div>\n                </div>\n                </div>\n                <!-- modal-end-bottom -->\n                <div class=\"pb-4\">\n                <div class=\"mb-3\">\n                    <label for=\"productDescription\" class=\"form-label\">\u7522\u54C1\u63CF\u8FF0</label>\n                    <textarea class=\"form-control mb-2\" id=\"productDescription\" rows=\"2\" placeholder=\"\u8ACB\u8F38\u5165\u7522\u54C1\u63CF\u8FF0\" v-model=\"tempProduct.description\"></textarea>\n                </div>\n                <div class=\"mb-3\">\n                    <label for=\"productDetail\" class=\"form-label\">\u8AAA\u660E\u5167\u5BB9</label>\n                    <textarea class=\"form-control mb-2\" id=\"productDetail\" rows=\"2\" placeholder=\"\u8ACB\u8F38\u5165\u8AAA\u660E\u5167\u5BB9\" v-model=\"tempProduct.content\"></textarea>\n                </div> \n                <!-- \u661F\u661F\u8A55\u5206 -->\n                <div class=\"mb-4\">\n                    <p class=\"mb-2\">\u7522\u54C1\u8A55\u50F9</p>\n                    <starvalue \n                    :list=\"list\" :star-a=\"starA\" :star-b=\"starB\" :star-score=\"starScore\"\n                    @click-stars=\"clickStars\">\n                    </starvalue>\n                </div> \n                <div class=\"form-check\">\n                    <input type=\"checkbox\" class=\"form-check-input\" value=\"\" id=\"is_enabled\" v-model=\"tempProduct.is_enabled\"\n                    :true-value=\"1\" :false-value=\"0\">\n                    <label for=\"is_enabled\" class=\"form-check-label\">\u662F\u5426\u555F\u7528</label>\n                </div>                  \n                </div>\n            </div>\n            </div>\n        </div>\n        <div class=\"modal-footer\">\n            <button type=\"button\" class=\"btn btn-outline-secondary\" data-bs-dismiss=\"modal\">\u53D6\u6D88</button>\n            <button type=\"button\" class=\"btn btn-primary\" @click=\"updateProduct\">\u78BA\u8A8D</button>\n        </div>\n        </div>\n    </div>"
};
"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var updateModal = {};
var deleteModal = {};
var updateApp = Vue.createApp({
  data: function data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
        upload: {}
      },
      isNew: false,
      pagination: {}
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

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      // API位址加入頁數變數
      axios.get("".concat(url, "/api/").concat(path, "/admin/products?page=").concat(page)).then(function (res) {
        _this2.products = res.data.products;
        _this2.pagination = res.data.pagination;
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
    }
  },
  components: {
    pagination: pagination,
    updatemodal: updatemodal,
    deletemodal: deletemodal
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
