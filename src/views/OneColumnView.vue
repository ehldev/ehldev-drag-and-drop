<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <p class="fw-bold">Una sola columna con texto simple</p>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="showHighlighted"
            v-model="showHighlighted"
          />
          <label class="form-check-label" for="showHighlighted">
            Resaltar elementos
          </label>
        </div>

        <!-- @drop="onDropContainer($event)" -->
        <ul
          class="list-group mt-3"
          @dragover.prevent
          @dragenter.prevent
          @drop="onDropContainer($event)"
          @mouseleave="resetDragAndDropItems()"
        >
          <li
            class="list-group-item"
            :class="{ drag: item.drag, drop: item.drop }"
            draggable
            v-for="(item, index) in items"
            :key="item.id"
            @dragstart="startDrag($event, index)"
            @drop="onDropItem($event, index)"
            @dragover.prevent
            @dragenter.prevent
            @dragover="addHighlightedToDropElement(index)"
            @dragleave="item.drop = false"
          >
            {{ item.title }}
          </li>
        </ul>

        <div class="mt-3">
          <button
            type="button"
            class="btn btn-primary"
            @click="generateItems()"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      showHighlighted: true
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
          title: `Task ${i}`,
        });
      }
    },
    startDrag(evt, index) {
      if (this.showHighlighted) {
        let list = JSON.parse(JSON.stringify(this.items));
        list[index].drag = true;
        this.items = list;
      }

      evt.dataTransfer.setData("dragIndex", index);
    },
    onDropContainer() {
      this.items.forEach((item) => {
        item.drop = false;
      });
    },
    onDropItem(evt, index) {
      let indexInt = parseInt(index);
      let dragIndex = parseInt(evt.dataTransfer.getData("dragIndex"));

      let list = JSON.parse(JSON.stringify(this.items));

      let dropItemCopy = JSON.parse(JSON.stringify(list[indexInt]));
      console.log(dropItemCopy);

      list[indexInt] = list[dragIndex];
      list[dragIndex] = dropItemCopy;

      list.forEach((item) => {
        item.drag = false;
      });

      this.items = list;
    },
    addHighlightedToDropElement(index) {
      if (this.showHighlighted) {

        let list = JSON.parse(JSON.stringify(this.items));

        list.forEach((item) => {
          item.drop = false;
        });

        list[index].drop = true;

        this.items = list;
      }
    },
    resetDragAndDropItems() {
        this.items.forEach(item => {
            item.drag = false
            item.drop = false
        })
    }
  },
};
</script>

<style>
</style>