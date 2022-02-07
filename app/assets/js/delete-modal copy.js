const deletemodal = {
    props: ['tempProduct'],
    methods: {
        deleteProduct() {
            let newUrl = `${url}/api/${path}/admin/product/${this.tempProduct.id}`;
            axios.delete(newUrl, { data: this.tempProduct})
            .then((res) => {
                deleteModal.hide();
                this.$emit('get-products');      
            })
            .catch((error) => {
                console.dir(error);
            })
        }      
    },
    template: `<div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="deleteModalLabel">刪除產品</h5>
        </div>
        <div class="modal-body">
            <p>是否刪除 <span class="text-danger">{{ tempProduct.title }}</span> 商品（刪除後將無法恢復）？</p> 
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">確認刪除</button>
        </div>
        </div>
    </div>`
}