<template>
    <section class="py-1 px-4 ">
        <div class="grid grid-cols-2 my-4">
            <div class="column ">
                <div class="grid grid-cols-2 gap-5">
                    <div class="column col-span-2">
                        <div class="card rounded-lg p-3 bg-gradient-to-br from-blue-200 to-blue-600">
                            <div class="card-body ">
                                <h4 class="font-bold text-blue-800">{{total}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Total</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                    <div class="column ">
                        <div class="card rounded-lg p-3 bg-gradient-to-br from-yellow-200 to-yellow-500">
                            <div class="card-body ">
                                <h4 class="font-bold text-amber-600">{{pending}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Pending</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                    <div class="column ">
                        <div class="card rounded-lg p-3 bg-gradient-to-br from-red-200 to-red-600">
                            <div class="card-body ">
                                <h4 class="font-bold text-red-800">{{bad}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Bad</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                    <div class="column col-span-2">
                        <div class="card rounded-lg p-3 bg-gradient-to-br from-green-200 to-green-600">
                            <div class="card-body ">
                                <h4 class="font-bold text-green-800">{{recovered}}</h4>
                            </div>
                            <div class="card-header">
                                <div class="card-title h5">Recovered</div>
                                <div class="card-subtitle text-gray">lorem ipsum</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column ">
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
                title: {
                    show: false,
                    text: "Udhaar Chart",
                    left: 'center',
                    // right: 'center',
                    // textAlign: 'center',
                },
                legend: {
                    // show: false,
                    bottom: 0,
                    left: 'center',
                    // icon: "pin",
                    itemGap: 20,
                    textStyle: {
                        fontSize: 14,
                    }
                },
                series: [{
                    name: 'Udhaar',
                    type: 'pie',
                    radius: ['15%', '40%'],
                    avoidLabelOverlap: true,
                    /*itemStyle: {
                        borderRadius: 3,
                        borderColor: '#fff',
                        borderWidth: 1
                    },*/
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        /*label: {
                            show: true,
                            fontSize: '32',
                            fontWeight: 'bold'
                        }*/
                    },
                    labelLine: {
                        length: 20,
                        showAbove: true,
                        smooth: 0.25,
                    },
                    label: {
                        formatter: ' {b|{b}}\n{c|{c}}\n{d|{d}%} ',
                        position: 'outside',
                        fontWeight: 'bold',
                        // backgroundColor: '#F6F8FC',
                        // padding: 4,
                        // borderColor: '#8C8D8E',
                        // borderWidth: 1,
                        // borderRadius: 4,
                        alignTo: 'labelLine',
                        rich: {
                            b: {
                                color: '#4C5058',
                                fontSize: 14,
                                lineHeight: 18
                            },
                            c: {
                                color: '#6E7079',
                                fontSize: 16,
                                fontWeight: 'bold',
                                lineHeight: 20,
                            },
                            d:{
                                color: "#657892",
                                fontWeight: 'light',
                                lineHeight: 16
                            }
                        }
                    },
                    data: [
                        { value: this.pending, name: 'Pending' },
                        { value: this.bad, name: 'Bad' },
                        { value: this.recovered, name: 'Recovered' },
                    ],
                    color: ['rgb(234, 179, 8)', 'rgb(220,38,38)', 'rgb(22, 163, 74)'],
                }]
            };

            option && myChart.setOption(option);
        }

    }
}
</script>
<style lang="css" scoped>
    #chart { max-width:720px; }
</style>