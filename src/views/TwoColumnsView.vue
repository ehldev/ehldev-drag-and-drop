<template>
  <div>
    <div class="row justify-content-between">
      <div class="col-12">
        <p class="fw-bold">Se pueden cambiar elementos entre listas.</p>
      </div>

      <div class="col-md-6">
        <p>Tallas registradas y ocultas</p>
        <ul
          class="list-group mt-3"
          :class="{ 'empty-list-group': !notVisible.length }"
          @dragover.prevent
          @dragenter.prevent
          @drop="onDropContainer($event)"
        >
          <li
            class="list-group-item"
            :class="{ drag: item.drag, drop: item.drop }"
            draggable
            v-for="(item, index) in notVisible"
            :key="item.id"
            @dragstart="startDrag($event, index)"
          >
            {{ item.title }}
          </li>

          <li v-if="!notVisible.length">Arrastre aquí</li>
        </ul>
      </div>

      <div class="col-md-6">
        <p>Tallas visibles</p>

        <ul
          class="list-group mt-3"
          draggable
          @dragover.prevent
          @dragenter.prevent
          @dragover="visibleItems.dropActive = true"
          @dragleave="visibleItems.dropActive = false"
          @drop="dropTarget"
          :class="{
            'empty-list-group': !visibleItems.list.length,
            drop: visibleItems.dropActive,
          }"
        >
          <li
            class="list-group-item"
            :class="{ drag: item.drag, drop: item.drop }"
            draggable
            v-for="item in visibleItems.list"
            :key="item.id"
          >
            {{ item.title }}
          </li>

          <li v-if="!visibleItems.list.length">Arrastre aquí</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      visibleItems: {
        list: [],
        dropActive: false,
      },
    };
  },
  mounted() {
    this.generateItems();
  },
  methods: {
    generateItems() {
      let total = 10;

      this.items = [];

      for (let i = 1; i <= total; i++) {
        this.items.push({
          id: i,
          title: `Talla ${i}`,
          visible: false,
        });
      }

      this.visibleItems.list = this.items.filter((item) => item.visible);
    },
    startDrag(evt, index) {
      let list = JSON.parse(JSON.stringify(this.items));
      list[index].drag = true;
      this.items = list;

      evt.dataTransfer.setData("dragIndex", index);
    },
    onDropContainer() {
      let list = JSON.parse(JSON.stringify(this.items))

      list.forEach((item) => {
        item.drag = false;
      });

      this.items = list
    },
    dropTarget(e) {
      let index = e.dataTransfer.getData("dragIndex")

      let list = JSON.parse(JSON.stringify(this.items))

      let item = list[index]
      this.visibleItems.list.push(item)
      
      list.splice(index, 1)

      this.visibleItems.dropActive = false
      item.drag = false

      this.items = list
    }
  },
  computed: {
    notVisible: function () {
      return this.items.filter((item) => !item.visible);
    },
    // visible: function () {
    //   return this.items.filter((item) => item.visible);
    // }
  },
};
</script>

<style lang="scss" scoped>
.empty-list-group {
  min-height: 100px;
  border: 1px solid #d4d4d4;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>