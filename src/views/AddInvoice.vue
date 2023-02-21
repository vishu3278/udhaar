<template>
    <div class="container p-2">
        <div class="columns">
            <div class="col-10 col-mx-auto">
                <add-invoice-form v-on:submit-form=""></add-invoice-form>
            </div>
        </div>
    </div>
</template>
<script>
import AddInvoiceForm from '@/components/AddInvoiceForm.vue'
export default {

    name: 'AddInvoice',
    components: {
        AddInvoiceForm
    },

    data() {
        return {
        }
    },
    
}
</script>
<style lang="css" scoped>
</style>