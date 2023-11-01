<script setup lang="ts">
const emit = defineEmits(['closemodal'])

function closeModal() {
  emit('closemodal')
}
</script>

<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <slot>Default content</slot>
      <button class="modal-x-button" @click="closeModal">
        <svg height="20" viewbox="0 0 24 24" width="20">
          <path fill="white"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style >
.modal {
  width: 520px;
  max-width: 100%;
  padding: 26px;
  margin: 63px auto;
  background: #121213;
  border: 1px solid #1a1a1b;
  border-radius: 8px;
  color: white;
  height: 700px;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
}

.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.modal-x-button {
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 16px;
  right: 16px;
  user-select: none;
  cursor: pointer;
}

.modal h2 {
  text-align: center;
  font-weight: 700;
  letter-spacing: .5px;
  text-transform: uppercase;
  font-size: 20px;
}

.victory-message h3 {
  text-align: center;
  font-size: 26px;
}

.settings-modal {
  display: flex;
  flex-direction: column;
}

.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: solid 1px #3a3a3c;
  padding: 10px 0 10px;
}

.settings-row p {
  margin: 0;
}

.settings-subtext {
  font-size: 12px;
  color: #818384
}
</style>