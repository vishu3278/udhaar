<template>
    <div class="container p-2">
        <div class="columns">
            <div class="col-6 column col-mx-auto">
                <div class="panel">
                    <div class="panel-header">
                        Add expense
                    </div>
                    <div class="panel-body">
                        <add-expense-form v-on:submit-form=""></add-expense-form>
                    </div>
                    <div class="panel-footer">
                        <!-- <button class="btn btn-primary" @click="addPayee">Submit</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AddExpenseForm from '@/components/AddExpenseForm.vue'
export default {

    name: 'AddPayeeView',
    components: {
        AddExpenseForm
    },

    data() {
        return {
        }
    },
    
}
</script>
<style lang="css" scoped>
</style>