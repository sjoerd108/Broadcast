<template>
    <div class="mdc-snackbar mdc-snackbar--align-start"
         aria-live="assertive"
         aria-atomic="true"
         aria-hidden="true">
      <div class="mdc-snackbar__text"></div>
      <div class="mdc-snackbar__action-wrapper">
        <button type="button" class="mdc-snackbar__action-button"></button>
      </div>
    </div>
</template>

<script>
import * as Mdc from 'material-components-web/dist/material-components-web.js';

export default {
    mounted: function() {
        let snackbar = new Mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
        this.$globalEventBus.$on('toastMessage', function (message) {
            console.log(snackbar);
            snackbar.show({
                message: message
            });
        });
    },
    beforeDestroy: function() {
        this.$globalEventBus.$off('toastMessage');
    }
}
</script>

<style scoped>
.mdc-snackbar {
    z-index: 10;
}
</style>
