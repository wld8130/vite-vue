<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade">
      <KeepAlive>
        <Component :is="Component" />
      </KeepAlive>
    </Transition>
  </RouterView>
</template>
