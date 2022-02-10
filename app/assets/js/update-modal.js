const updatemodal = {
    data () {
        return {
            list: [0, 1, 2, 3, 4],
            starA: './assets/images/star-filled.svg',
            starB: './assets/images/star-outlined.svg',
            starScore: 0
        }
    },
    props: ['tempProduct', 'isNew'],
    methods: {
        updateProduct() {
            let newUrl = `${url}/api/${path}/admin/product`;
            let method = 'post';
            // 如果是編輯模式，api位址和介接方法變動為
            if (!this.isNew) {
                newUrl = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
                method = 'put';            
            }

            axios[method](newUrl, { data: this.tempProduct})
            .then((res) => {
                this.$emit('get-products');
                updateModal.hide();
            })
            .catch((error) => {
                console.dir(error);
            })
        },
        upload(event) {
            // 找到資料位置
            const file = event.target.files[0];
            console.log(file);
            // 上傳form的資料屬性
            const formData = new FormData();
            // 將API<input name>欄位夾帶
            formData.append('file-to-upload', file);

            axios.post(`${url}/api/${path}/admin/upload`, formData)
            .then((res) => {
                console.log(res);
                this.tempProduct.imageUrl = res.data.imageUrl;
            })
            .catch((error) => {
                console.log(error.response);
            })
        },
        clickStars(i) {
            this.starScore = i+1;
        }
    },
    components: {
        starvalue
    },
    template: `<div class="modal-dialog modal-xl">
        <div class="modal-content">
        <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="updateModalLabel">新增產品</h5>
        </div>
        <div class="modal-body">
            <div class="row">
            <!-- modal-start -->
            <div class="col-4">
                <div class="mb-5">
                    <label for="imgUrl" class="form-label">主要圖片</label>
                    <input type="file" class="form-control mb-2" id="imgFile" @change="upload">
                    <p>或</p>
                    <input type="text" class="form-control mb-2" name="img-url" id="imgUrl" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                    <img :src="tempProduct.imageUrl" class="img-fluid"> 
                </div>
                <div>
                <!-- 多圖新增 -->
                <h3 class="mb-3">多圖新增</h3>
                <!-- 先判斷 tempProduct.imagesUrl 是否為陣列資料-->
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                    <div v-for="(img, key) in tempProduct.imagesUrl" :key="key + 12345">
                    <input type="text" class="form-control mb-2" name="img-url" id="imgUrl" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                    <img :src="tempProduct.imagesUrl[key]" class="img-fluid mb-2">                             
                    </div>
                    <!-- 新增按鈕的進階判斷：1.陣列為空陣列 2.陣列最後一筆資料有內容 -->
                    <button type="button" class="btn btn-primary btn-sm w-100 mb-2" 
                    v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                    <button type="button" class="btn btn-outline-danger btn-sm w-100" 
                    v-else @click="tempProduct.imagesUrl.pop()">刪除最後一筆圖片</button>
                </div>
                </div>
            </div>
            <!-- modal-end -->
            <div class="col-8">
                <!-- modal-end-top -->
                <div class="pb-4 border-bottom mb-3">
                <div class="mb-3">
                    <label for="productTitle" class="form-label">標題</label>
                    <input type="text" class="form-control mb-2" name="product-title" 
                    id="productTitle" placeholder="請輸入標題" v-model="tempProduct.title" autocomplete="on">
                </div>
                <div class="row">
                    <div class="col">
                    <div class="mb-3">
                        <label for="productCategory" class="form-label">分類</label>
                        <input type="text" class="form-control mb-2" name="product-category" 
                        id="productCategory" placeholder="請輸入分類" v-model="tempProduct.category" autocomplete="on">
                    </div>                      
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="productUnit" class="form-label">單位</label>
                        <input type="text" class="form-control mb-2" name="product-unit" 
                        id="productUnit" placeholder="請輸入單位" v-model="tempProduct.unit" autocomplete="on">
                    </div> 
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                    <div class="mb-3">
                        <label for="productPrice" class="form-label">原價</label>
                        <input type="text" class="form-control mb-2" name="product-price" 
                        id="productPrice" placeholder="請輸入原價" v-model.number="tempProduct.origin_price" autocomplete="on">
                    </div>                      
                    </div>
                    <div class="col">
                    <div class="mb-3">
                        <label for="productSalePrice" class="form-label">售價</label>
                        <input type="text" class="form-control mb-2" name="product-sale-price" 
                        id="productSalePrice" placeholder="請輸入售價" v-model.number="tempProduct.price" autocomplete="on">
                    </div> 
                    </div>
                </div>
                </div>
                <!-- modal-end-bottom -->
                <div class="pb-4">
                <div class="mb-3">
                    <label for="productDescription" class="form-label">產品描述</label>
                    <textarea class="form-control mb-2" id="productDescription" rows="2" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="mb-3">
                    <label for="productDetail" class="form-label">說明內容</label>
                    <textarea class="form-control mb-2" id="productDetail" rows="2" placeholder="請輸入說明內容" v-model="tempProduct.content"></textarea>
                </div> 
                <!-- 星星評分 -->
                <div class="mb-4">
                    <p class="mb-2">產品評價</p>
                    <starvalue 
                    :list="list" :star-a="starA" :star-b="starB" :star-score="starScore"
                    @click-stars="clickStars">
                    </starvalue>
                </div> 
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" value="" id="is_enabled" v-model="tempProduct.is_enabled"
                    :true-value="1" :false-value="0">
                    <label for="is_enabled" class="form-check-label">是否啟用</label>
                </div>                  
                </div>
            </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
        </div>
    </div>`
}