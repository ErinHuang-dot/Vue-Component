const starvalue = {
    props: ['list', 'starA', 'starB', 'starScore', 'tempProduct'],
    template: `<ul class="stars-wrap ps-0 mb-0 d-flex">
        <li v-for="(i, index) in list" :key="index" @click="$emit('click-stars', index)">
            <img class="star" :src="starScore>index?starA:starB"/>
        </li>
    </ul>`
}