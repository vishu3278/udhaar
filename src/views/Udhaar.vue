<template>
    <div class="container">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Lending Date</th>
                    <th>Return Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Naveen</td>
                    <td>10000</td>
                    <td>24 June 2022</td>
                    <td>2 July 2022</td>
                    <td><button class="btn btn-primary btn-sm">Done</button> <button class="btn btn-warning btn-sm">Extend</button> <button class="btn btn-error btn-sm">Bad</button></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Tarun</td>
                    <td>5000</td>
                    <td>24 June 2021</td>
                    <td>2 July 2021</td>
                    <td><button class="btn btn-primary btn-sm">Done</button> <button class="btn btn-warning btn-sm">Extend</button> <button class="btn btn-error btn-sm">Bad</button></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Suresh</td>
                    <td>3000</td>
                    <td>24 Mar 2022</td>
                    <td>2 Sept 2022</td>
                    <td><button class="btn btn-primary btn-sm">Done</button> <button class="btn btn-warning btn-sm">Extend</button> <button class="btn btn-error btn-sm">Bad</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {

    name: 'Dashboard',

    data() {
        return {

        }
    }
}
</script>
<style lang="css" scoped>
</style>