<template>
    <section class="bg-secondary p-2 mb-3">
        <div class="columns m-2">
            <div class="column col-7">
                <div class="columns">
                    <div class="column col-12">
                        <div class="card mb-3">
                            <div class="card-body bg-primary">
                                <h4 class="">{{total}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Total</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                    <div class="column col-6">
                        <div class="card">
                            <div class="card-body bg-warning">
                                <h4 class="">{{pending}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Pending</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                    <div class="column col-6">
                        <div class="card">
                            <div class="card-body bg-error">
                                <h4 class="">{{bad}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Bad</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                    <div class="column col-12">
                        <div class="card mt-3">
                            <div class="card-body bg-success">
                                <h4 class="">{{recovered}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Recovered</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column col-5">
                <div class="card">
                    <!-- <div class="card-header">
                        <div class="card-title h5">Total</div>
                        <div class="card-subtitle text-gray">lorem</div>
                    </div> -->
                    <div class="card-body">
                        <div id="chart" style=" width:100%; aspect-ratio: 1;"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
// import { getPayees } from '../firebase.js'
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, getPayees, updatePayee } from "@/firebase.js"
import * as echarts from 'echarts';

export default {

    name: 'Dashboard',

    data() {
        return {
            payees: [],
            msg: "",
            /*total: 0,
            pending: 0,
            bad: 0,*/
        }
    },

    computed: {
        total() {
            return this.payees.reduce((a, b) => a + b.amount, 0)
        },
        pending() {
            return this.payees.reduce((a, b) => a + b.pending, 0)
        },
        bad() {
            // return this.payees.reduce((a, b) => b.bad ? a + b.pending : 0 }, 0)
            let b = 0
            this.payees.forEach((bad) => {
                if (bad.bad) {
                    b += bad.pending
                }
            })
            return b
        },
        recovered() {
            return this.total - (this.pending)
        }
    },

    mounted() {
        console.log('dashboard mounted')
        const q = query(collection(db, "payees"), orderBy("name"));
        let payees = []
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const cities = [];
            querySnapshot.docs.map(doc => {
                cities.push(doc.data());
                // console.log('loop->',doc.data());
            });
            // console.log("Current payees ", cities);
            this.payees = cities
            this.renderChart()
        })

        /*getPayees()
            .then(p => {
                this.payees = p
                this.payees.map((elem) => {
                    // return something;
                    // console.log(elem.amount)
                    this.total += elem.amount
                    this.pending += elem.pending
                    this.bad += elem.bad ? elem.pending : 0
                })
                this.renderChart()
            })
            .catch(e => console.log(e))*/
    },
    methods: {

        closeModal() {
            this.msg = null
        },
        autocloseModal(duration = 3500) {
            setTimeout(() => {
                this.msg = null
            }, duration)
        },
        renderChart() {
            const chartDom = document.getElementById('chart');
            let myChart = echarts.init(chartDom);
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '2%',
                    left: 'center'
                },
                series: [{
                    name: 'Udhaar',
                    type: 'pie',
                    radius: ['35%', '70%'],
                    avoidLabelOverlap: true,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        /*label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }*/
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: this.pending, name: 'Pending' },
                        { value: this.bad, name: 'Bad' },
                        { value: this.recovered, name: 'Recovered' },
                    ],
                    color: ['#ffb700', '#e85600', '#32b643'],
                }]
            };

            option && myChart.setOption(option);
        }

    }
}
</script>
<style lang="css" scoped>
</style>