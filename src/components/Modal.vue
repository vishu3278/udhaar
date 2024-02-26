<template>
    <transition name="modal-fade">
        <div class="modal-overlay fixed inset-0 z-10 backdrop-grayscale flex flex-col items-center justify-center">
            <!-- <a href="#close" class="modal-overlay" aria-label="Close" @click="closeModal"></a> -->
            <div class="modal-container bg-white p-3 rounded shadow-md">
                <header class="modal-header flex items-center justify-between gap-2">
                    <div class="modal-title text-lg text-blue-500">
                        {{ title }}
                    </div>
                    <a href="#close" class="btn-close px-1 text-slate-500 hover:bg-gray-200 rounded-full " aria-label="Close" @click="closeModal"><i class="ri-close-line"></i></a>
                </header>
                <div class="modal-body">
                    <slot name="content">
                        <div class="content">
                            <h6><span class="text-error"><i class="ri-error-warning-fill"></i> No </span> Past transactions</h6>
                            <table class="table table-striped table-hover w-full">
                                <thead>
                                    <tr>
                                        <th>Amount</th>
                                        <th>Due date</th>
                                        <th>Pay date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>012</td>
                                        <td>022</td>
                                        <td>032</td>
                                    </tr>
                                    <tr>
                                        <td>012</td>
                                        <td>022</td>
                                        <td>032</td>
                                    </tr>
                                    <tr>
                                        <td>012</td>
                                        <td>022</td>
                                        <td>032</td>
                                    </tr>
                                    <tr>
                                        <td>012</td>
                                        <td>022</td>
                                        <td>032</td>
                                    </tr>
                                    <tr>
                                        <td>012</td>
                                        <td>022</td>
                                        <td>032</td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- <Transactions :payee="payee"></Transactions> -->
                            <div class="divider"></div>
                            <!-- <template v-if="payee?.pending > 0"> -->
                            <h6>Add transaction</h6>
                        </div>
                    </slot>
                </div>
                <footer class="modal-footer ">
                    <slot name="footer">
                        <button class="btn" @click="closeModal">Close</button>
                    </slot>
                    
                </footer>
                <!-- <div v-else class="modal-footer">
            </div> -->
            </div>
        </div>
    </transition>
</template>
<script>
export default {

    name: 'Modal',

    props: {
        show: Boolean,
        title: String,

    },

    data() {
        return {
            showModal: false,
        }
    },
    watch: {
        show(val, oldVal) {
            this.showModal = val
        }
    },
    methods: {
        closeModal() {
            this.showModal = false
            this.$emit("close")
        }
    }
}
</script>
<style lang="css" scoped>
/*    all styles in base.css*/
/*.modal {
    @apply fixed inset-0
}*/

.modal-overlay {
    @apply bg-slate-300/80 
}

.modal-container {
    z-index: 90;
    min-width: 600px;
    max-width: 800px;
}

.modal-header {
    @apply border-b pb-2
}

.modal-title {
    @apply font-bold
}

.modal-body {
    max-height: 50vh;
    @apply overflow-auto py-2
}

.modal-footer {
    @apply border-t pt-2
}

.modal-fade-enter,
.modal-fade-leave-to {
/*    opacity: 0;*/
    @apply opacity-0
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .5s ease;
/*    @apply transition-opacity */
}
</style>