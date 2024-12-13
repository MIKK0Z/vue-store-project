<script>
    export default {
        props: ["promotion"],
        computed: {
            containerBg() {
                const { image } = this.promotion;
                let url;

                try {
                    url = `/src/assets/${image}`;
                } catch (error) {
                    console.log(error);
                }
                
                return {
                    background: `url(${url})`,
                };
            }
        }
    }
</script>

<template>
    <div :style="containerBg">
        asd
    </div>
</template>