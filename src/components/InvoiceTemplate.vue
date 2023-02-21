<template>
    <div class="template">
        <h1 class="green">{{ invoice.id }}</h1>
        <h4>
            {{invoice.from}}
        </h4>
    </div>
</template>
<script>
export default {
    name: "InvoiceTemplate"
    props: {
        invoice: Object,
    }
}
</script>
<style scoped>
h1 {
    font-weight: 500;
    font-size: 2rem;
    /*top: -10px;*/
}

h4 {
    font-size: 1.1rem;
}
</style>