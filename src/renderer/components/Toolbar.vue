<template>
<div>
    <header class="mdc-toolbar mdc-toolbar--fixed">
        <div class="mdc-toolbar__row">
            <section class="mdc-toolbar__section mdc-toolbar__section--align-start">
                <span class="mdc-toolbar__title">{{ title }}</span>
            </section>
        </div>
    </header>
</div>
</template>

<script>
export default {
    data: function() {
        return {
            title: 'Broadcast'
        }
    },
    created: function() {
        let self = this;
        this.$globalEventBus.$on('changeTitle', function (title) {
            console.log('Change title!');
            self.title = title;
        });
    },
    beforeDestroy: function() {
        this.$globalEventBus.$off('changeTitle');
    }
}
</script>
