let updateModal = {};
let deleteModal = {};

const updateApp = Vue.createApp ({
    data() {
        return {
            products: [],
            tempProduct: {
                imagesUrl: [],
            },
            isNew: false,
            pagination: {}
        }
    },
  
    methods: {
        checkLogin() {
            axios.post(`${url}/api/user/check`)
            .then((res) => {
                this.getProducts();
            })            
            .catch((error) => {
                window.alert(`驗證失敗，請重新登入`);
                window.location.href = 'index.html';                
            })
        },
        getProducts(page = 1) {
            // API位址加入頁數變數
            axios.get(`${url}/api/${path}/admin/products?page=${page}`)
            .then((res) => {
                this.products = res.data.products;
                this.pagination = res.data.pagination;
            })
            .catch((error) => {
                window.alert('error');
            })   
        },
        openModal(status, product) {
            // 新增、編輯共用的判斷
            if (status === 'isNew') {
                this.tempProduct = {
                    imagesUrl: []
                }
                updateModal.show();
                this.isNew = true;
            } else if (status === 'edit') {
                this.tempProduct = { ...product }
                updateModal.show();  
            // 刪除的判斷        
            } else if (status === 'delete') {
                this.tempProduct = { ...product }
                deleteModal.show();
            }
        },
        
    },

    components: {
        pagination,
        updatemodal,
        deletemodal
    },

    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;

        this.checkLogin();

        updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
        deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        
    }
  
})
  
updateApp.mount('#updateApp');