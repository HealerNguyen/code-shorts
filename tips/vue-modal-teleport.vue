<template>
  <!-- 🛑 The Modal is trapped inside a parent with overflow:hidden and lower z-index! -->
  <div class="parent-container">
    <div class="modal">
      <h2>Broken Modal 😭</h2>
      <p>I'm stuck inside!</p>
    </div>
  </div>
</template>

<template>
  <div class="parent-container">
    <!-- 🪄 Use <Teleport> to render the modal directly in the <body> -->
    <Teleport to="body">
      <div class="modal active">
        <h2>Fixed Modal 🤩</h2>
        <p>I escaped with Teleport!</p>
      </div>
    </Teleport>
  </div>
</template>
