<template>
  <swiper
      class="w-full h-128"
      previous-margin="30px"
      next-margin="30px"
      :circular="true"
      @change="handleChange">
      <swiper-item v-for="(item, index) in cards" :key="item.id">
        <card-item :zhName="item.zh_name"
          :enName="item.en_name"
          :zhSpell="item.zh_spell"
          :enSpell="item.en_spell"
          :color="item.color"
          :index="index"
          :current-index="currentIndex"
          :total="cards.length"/>
      </swiper-item>
    </swiper>
</template>

<script>
import CardItem from '../../components/card/Item.vue'

export default {
  name: "CardList",
  components: {
    CardItem
  },
  data () {
    return {
      currentIndex: 0,
      cards: [
        {
          id: 1,
          zh_name: '苹果',
          zh_spell: 'píng guǒ',
          en_name: 'apple',
          en_spell: '[ˈæpl]',
          icon: '',
          color: 'red'
        },
        {
          id: 2,
          zh_name: '梨',
          zh_spell: 'lí',
          en_name: 'pear',
          en_spell: '[per]',
          icon: '',
          color: 'yellow'
        },
        {
          id: 3,
          zh_name: '橙子',
          zh_spell: 'chéng zi',
          en_name: 'orange',
          en_spell: `['ɔrɪndʒ]`,
          icon: '',
          color: 'orange'
        }
      ]
    }
  },
  methods: {
    handleChange(e) {
      this.currentIndex = e.detail.current
    }
  }
}
</script>