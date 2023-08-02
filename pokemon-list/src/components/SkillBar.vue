<template>
  <div class="skill-bar" :style="{ width: '300px', height: '8px', borderRadius: '40px' }">
    <div class="skill-value bg-light-blue-10" :style="{ width: skillValueWidth, height: '100%', borderRadius: '40px' }"></div>
  </div>
</template>

<script>
export default {
  props: {
    skillValue: {
      type: Number,
      required: true
    }
  },
  computed: {
    skillValueWidth () {
      const screenSize = 500
      return `${(this.skillValue / 100) * ((4 / 7) * screenSize)}px`
    }
  }
}
</script>

<style>
.skill-bar {
  display: flex;
  background-color: #e5e5e5;
  width: 100%;
}
</style>
